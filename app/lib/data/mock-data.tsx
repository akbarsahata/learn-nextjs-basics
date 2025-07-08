export type Catalog = {
  id: string;
  name: string;
  description: string;
};

export const catalogs: Catalog[] = [
  {
    id: "1",
    name: "SSG",
    description: "Static Site Generation",
  },
  {
    id: "2",
    name: "SSR",
    description: "Server Side Rendering",
  },
  {
    id: "3",
    name: "ISR",
    description: "Incremental Static Regeneration",
  },
  {
    id: "4",
    name: "Client Rendered",
    description: "Client-side Rendering",
  },
];
