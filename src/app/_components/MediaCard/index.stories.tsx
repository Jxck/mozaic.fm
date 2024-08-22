import type { Meta, StoryObj } from "@storybook/react";
import MediaCard from "./";

const meta = {
  component: MediaCard,
  argTypes: {
    title: { control: "text" },
    text: { control: "text" },
    date: { control: "date" },
    guests: {
      control: "object",
      description: "Array of guest objects with a name and URL",
    },
  },
} satisfies Meta<typeof MediaCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: "Podcast Episode",
    text: "This is an engaging episode about modern web development.",
    date: "2024-08-22",
    guests: [
      { name: "John Doe", url: new URL("https://johndoe.com") },
      { name: "Jane Smith", url: new URL("https://janesmith.com") },
    ],
  },
} satisfies Story;
