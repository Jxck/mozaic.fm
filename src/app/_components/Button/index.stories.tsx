import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./";

const meta = {
  component: Button,
  argTypes: {
    valiant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    type: {
      control: { type: "text" },
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    valiant: "primary",
    children: "Primary Button",
    onClick: () => {},
  },
} satisfies Story;

export const Secondary = {
  args: {
    valiant: "secondary",
    children: "Secondary Button",
    onClick: () => {},
  },
} satisfies Story;

export const CustomType = {
  args: {
    type: "submit",
    valiant: "primary",
    children: "Submit Button",
    onClick: () => {},
  },
} satisfies Story;
