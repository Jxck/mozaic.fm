import type { Meta, StoryObj } from "@storybook/react";
import Header from "./";

const meta = {
  component: Header,
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
