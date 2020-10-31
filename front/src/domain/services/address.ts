export const isPostalcode = (target: string) =>
  // /^([数字が0~7個]|[数字が0~3個]|[数字が3個][ハイフン][数字が0~4個])$/;
  /^(\d{0,7}|\d{0,3}|\d{3}-\d{0,4})$/.test(target);
