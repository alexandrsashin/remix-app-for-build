import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => [
  {
    name: "description",
    content: "Site on Remix",
  },
  {
    title: "Remix",
  },
];
const Main = () => <article>Hello, world!</article>;

export default Main;
