export function dataTrimmer(data: any) {
  let trimmedData = { ...data };

  for (let key in trimmedData) {
    if (typeof trimmedData[key] === 'string') {
      trimmedData[key] = trimmedData[key].trim();
    }
  }
  return trimmedData;
}
