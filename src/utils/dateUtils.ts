export function parseLocalDateToUTCDate(dateStr: string): Date {
    const [dd, mm, yyyy] = dateStr.split('/').map(Number);
  
    if (!dd || !mm || !yyyy) {
      throw new Error('Invalid date format, expected DD/MM/YYYY');
    }
  
    // Create UTC date: months are 0-based
    return new Date(Date.UTC(yyyy, mm - 1, dd));
  }
  