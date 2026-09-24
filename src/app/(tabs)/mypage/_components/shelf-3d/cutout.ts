/**
 * 이 값보다 밝으면 배경 후보로 본다.
 *
 * 255만 지우면 JPEG 압축·안티앨리어싱 탓에 병 둘레에 흰 테두리가 남고,
 * 240 아래로 내리면 몸통이 밝은 향수에서 누끼가 안쪽으로 새어 들어간다.
 * 실제 제품 사진들로 재보니 248이 그 사이의 안전선이었다.
 */
const WHITE_THRESHOLD = 248;

const isBackgroundPixel = (data: Uint8ClampedArray, index: number) =>
  data[index] >= WHITE_THRESHOLD &&
  data[index + 1] >= WHITE_THRESHOLD &&
  data[index + 2] >= WHITE_THRESHOLD;

/**
 * 제품 사진의 흰 배경을 투명하게 만든다.
 *
 * 밝은 픽셀을 전부 지우면 병 라벨이나 캡의 흰 부분까지 뚫리므로,
 * 가장자리에서 시작해 이어져 있는 영역만 따라가며 지운다.
 */
export const cutOutWhiteBackground = (image: HTMLImageElement) => {
  const { naturalWidth: width, naturalHeight: height } = image;
  if (!width || !height) return null;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;

  context.drawImage(image, 0, 0);

  let imageData: ImageData;
  try {
    imageData = context.getImageData(0, 0, width, height);
  } catch {
    // 다른 도메인 이미지가 CORS를 막으면 픽셀을 읽을 수 없다
    return null;
  }

  const { data } = imageData;
  const visited = new Uint8Array(width * height);
  const stack: number[] = [];

  // 네 변의 픽셀을 출발점으로 삼는다
  for (let x = 0; x < width; x += 1) {
    stack.push(x, x + (height - 1) * width);
  }
  for (let y = 0; y < height; y += 1) {
    stack.push(y * width, width - 1 + y * width);
  }

  while (stack.length > 0) {
    const pixel = stack.pop() as number;
    if (visited[pixel]) continue;
    visited[pixel] = 1;

    const index = pixel * 4;
    if (!isBackgroundPixel(data, index)) continue;

    data[index + 3] = 0;

    const x = pixel % width;
    const y = (pixel - x) / width;
    if (x > 0) stack.push(pixel - 1);
    if (x < width - 1) stack.push(pixel + 1);
    if (y > 0) stack.push(pixel - width);
    if (y < height - 1) stack.push(pixel + width);
  }

  /**
   * 지워진 영역에 맞닿은 픽셀은 밝기에 따라 투명도를 준다.
   * 일괄로 반투명하게 만들면 병 윤곽이 뿌옇게 번지고, 그대로 두면 계단처럼 각진다.
   */
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    const index = pixel * 4;
    if (data[index + 3] === 0) continue;

    const x = pixel % width;
    const y = (pixel - x) / width;
    const hasTransparentNeighbor =
      (x > 0 && data[(pixel - 1) * 4 + 3] === 0) ||
      (x < width - 1 && data[(pixel + 1) * 4 + 3] === 0) ||
      (y > 0 && data[(pixel - width) * 4 + 3] === 0) ||
      (y < height - 1 && data[(pixel + width) * 4 + 3] === 0);
    if (!hasTransparentNeighbor) continue;

    // 흰색에 가까울수록 더 투명하게 — 255면 0, 임계값이면 그대로 둔다
    const brightness = Math.min(data[index], data[index + 1], data[index + 2]);
    const opacity = (255 - brightness) / (255 - WHITE_THRESHOLD);
    data[index + 3] = Math.round(255 * Math.min(1, Math.max(0, opacity)));
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
};
