export const isPostalcode = (target: string) =>
  // /^([数字が0~7個]|[数字が0~3個]|[数字が3個][ハイフン][数字が0~4個])$/;
  /^(\d{0,7}|\d{0,3}|\d{3}-\d{0,4})$/.test(target);
// 最後まで入力されて 7 桁になっているかどうかをチェック
export const isCompletePostalcode = (target: string) =>
  /^(\d{7}|\d{3}-\d{4})$/.test(target);
// -を取り除いて数字だけにする
export const sanitizePostalcode = (target: string) => target.replace(/-/, '');
