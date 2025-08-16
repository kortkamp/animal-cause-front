function timeSince(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // approximate
  const years = Math.floor(days / 365); // approximate

  if (years >= 1) {
    return years === 1 ? "1 ano" : `${years} anos`;
  }
  if (months >= 1) {
    return months === 1 ? "1 mês" : `${months} meses`;
  }
  if (days >= 1) {
    return days === 1 ? "1 dia" : `${days} dias`;
  }
  if (hours >= 1) {
    return hours === 1 ? "1 hora" : `${hours} horas`;
  }
  if (minutes >= 1) {
    return minutes === 1 ? "1 minuto" : `${minutes} minutos`;
  }
  return seconds <= 0 ? "agora" : `${seconds} segundos`;
}

export { timeSince }