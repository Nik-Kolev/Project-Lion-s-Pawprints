type TrimInput = { [key: string]: any };

export function dataTrimmer(data: TrimInput): TrimInput {
  let result: TrimInput = {};
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (typeof value === 'string') {
      result[key] = value.trim();
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) => {
        if (typeof item === 'string') {
          return item.trim();
        } else if (typeof item === 'object' && item !== null) {
          return dataTrimmer(item);
        } else {
          return item;
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      result[key] = dataTrimmer(value);
    } else {
      result[key] = value;
    }
  });
  return result;
}
