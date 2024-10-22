export class Blog {
    id?: number;
    username?: string;
    text?: string;
  dateCreated?: Date;


  constructor(init?: Partial<Blog>) {
    // Destructure init for easier assignment
    this.id = init?.id ?? 0;  // Using nullish coalescing
    this.username = init?.username || '';
    this.text = init?.text || '';
    this.dateCreated = init?.dateCreated || new Date();
  }
  }
