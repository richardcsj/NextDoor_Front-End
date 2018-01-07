export class Feedback {
  firstname: string;
  lastname: string;
  phone: number;
  email: string;
  agree: boolean;
  contacttype: string;
  message: string;
};

export const ContactType = ['None', 'Phone', 'Email'];
