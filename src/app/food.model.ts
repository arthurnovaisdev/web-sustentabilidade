export interface FoodItem {
  id: string;
  name: string;
  amountKg: number;
  expiresOn: string;
  destination: 'consumir' | 'doar';
  done: boolean;
  createdAt: string;
}

export function daysUntil(date: string): number {
  // A gente olha só o dia, sem o horário, para o aviso não mudar no meio do dia.
  const today = new Date();
  const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const [year, month, day] = date.split('-').map(Number);
  return Math.round((new Date(year, month - 1, day).getTime() - midnight) / 86400000);
}
