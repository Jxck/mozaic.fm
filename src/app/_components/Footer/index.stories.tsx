import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./";

const meta = {
  component: Footer,
  argTypes: {},
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
