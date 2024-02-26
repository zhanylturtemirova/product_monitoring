export interface Categorie {
  title: string;
  slug: string;
}

export interface Site {
  logoSmall2x: string;
  slug: string;
  title: string;
  domains: string[];
}

export interface Automation {
  id: string;
  title: string;
  shortDescription: string;
  slug: string;
  priority: number;
  categories: Categorie[];
  sites: Site[];
}
