import { Editor } from "slate";
import { CustomElementStrings } from "../../types/slate";
import { DefaultElement, RenderElementProps } from "slate-react";
import QuoteElement, { QuoteElementSerialize } from "./quote-element";
import { HeadingElement, HeadingElementSerialize } from "./heading-element";
import { ButtonElement, ButtonElementSerialize } from "./button-element";
import { GroupElement, GroupElementSerialize } from "./group-element";
import { ColumnElement, ColumnElementSerialize } from "./column-element";
import { EmbedElement, EmbedElementSerialize } from "./embed-element";
import ImageElement, { ImageElementSerialize } from "./image-element";
import TodoElement, { TodoElementSerialize } from "./todo-element";
import DividerElement, { DividerElementSerialize } from "./divider-element";
import { CodeElement, CodeElementSerialize } from "./code-element";
import ParagraphElement, {
  ParagraphElementSerialize,
} from "./paragraph-element";
import ListItemElement, { ListItemElementSerialize } from "./list-item-element";
import NumberedListElement, {
  NumberedListElementSerialize,
} from "./numbered-list-element";
import BulletedListElement, {
  BulletedListElementSerialize,
} from "./bulleted-list-element";
import {
  UserAttributeElement,
  UserAttributeElementSerialize,
} from "./user-attr-element";
import { LinkElement, LinkElementSerialize } from "./link-element";

export { CodeElement } from "./code-element";
export { HeadingElement } from "./heading-element";
export { GroupElement } from "./group-element";
export { ColumnElement } from "./column-element";

type ElementMetadata = {
  // eslint-disable-next-line no-unused-vars
  render: (x: MetaRenderElementProps) => JSX.Element;
  serialize: (x: any) => JSX.Element;
};

type MetaRenderElementProps = RenderElementProps & { className?: string };

type ElementMap = Record<CustomElementStrings, ElementMetadata>;

export const ELEMENTS: ElementMap = {
  quote: {
    serialize: QuoteElementSerialize,
    render: QuoteElement,
  },
  h1: {
    serialize: (props: any) => (
      <HeadingElementSerialize headingSize={1} {...props} />
    ),
    render: (props: MetaRenderElementProps) => (
      <HeadingElement headingSize={1} {...props} />
    ),
  },
  h2: {
    serialize: (props: any) => (
      <HeadingElementSerialize headingSize={2} {...props} />
    ),
    render: (props: MetaRenderElementProps) => (
      <HeadingElement headingSize={2} {...props} />
    ),
  },
  h3: {
    serialize: (props: any) => (
      <HeadingElementSerialize headingSize={3} {...props} />
    ),
    render: (props: MetaRenderElementProps) => (
      <HeadingElement headingSize={3} {...props} />
    ),
  },
  button: {
    serialize: ButtonElementSerialize,
    render: ButtonElement,
  },
  group: {
    serialize: GroupElementSerialize,
    render: GroupElement,
  },
  column: {
    serialize: ColumnElementSerialize,
    render: ColumnElement,
  },
  embed: {
    serialize: EmbedElementSerialize,
    render: EmbedElement,
  },
  image: {
    serialize: ImageElementSerialize,
    render: ImageElement,
  },
  todo: {
    serialize: TodoElementSerialize,
    render: TodoElement,
  },
  divider: {
    serialize: DividerElementSerialize,
    render: DividerElement,
  },
  code: {
    serialize: CodeElementSerialize,
    render: CodeElement,
  },
  paragraph: {
    serialize: ParagraphElementSerialize,
    render: ParagraphElement,
  },
  "bulleted-list": {
    serialize: BulletedListElementSerialize,
    render: BulletedListElement,
  },
  "numbered-list": {
    serialize: NumberedListElementSerialize,
    render: NumberedListElement,
  },
  "list-item": {
    serialize: ListItemElementSerialize,
    render: ListItemElement,
  },
  "user-attribute": {
    serialize: UserAttributeElementSerialize,
    render: UserAttributeElement,
  },
  link: {
    serialize: LinkElementSerialize,
    render: LinkElement,
  },
};
