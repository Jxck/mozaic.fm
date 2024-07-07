import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button, type Props } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    valiant: { control: "select" },
  },
  args: { onClick: fn() },
} satisfies Meta<Props>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "hello",
    valiant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "hello",
    valiant: "secondary",
  },
};
