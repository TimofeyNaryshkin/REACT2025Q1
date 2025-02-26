import { Result } from '../types/response';

export const convertToCsv = (arr: Result[]) => {
  const csvHeaders = Object.keys(arr[0]);
  const csvRows = [...arr].map((item) => Object.values(item));
  const csvArr = [csvHeaders, csvRows].map((arr) => arr.join(',')).join('\n');
  return [csvArr];
};

export const downloadCsv = (arr: Result[]) => {
  const blob = new Blob(convertToCsv(arr), { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const fileName = `${arr.length}_starship${arr.length > 1 ? 's' : ''}.csv`;
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
};
