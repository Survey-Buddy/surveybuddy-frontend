import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CopyToClipboard from "@/components/main/copyToClipboard";

describe("CopyToClipboard Component", () => {
  const textToCopy = "https://example.com";

  beforeEach(() => {
    // Mock the clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(),
      },
    });
  });

  it("renders the CopyToClipboard component correctly", () => {
    render(<CopyToClipboard textToCopy={textToCopy} />);

    // Verify the button and icon are rendered
    const button = screen.getByRole("button", { name: /copy to clipboard/i });
    expect(button).toBeInTheDocument();

    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toHaveClass("text-gray-500");
  });

  it("copies text to clipboard and displays the copied state", async () => {
    render(<CopyToClipboard textToCopy={textToCopy} />);

    const button = screen.getByRole("button", { name: /copy to clipboard/i });

    // Simulate a button click
    fireEvent.click(button);

    // Verify the clipboard API is called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);

    // Verify the copied state is shown
    const iconAfterCopy = screen.getByRole("img", { hidden: true });
    expect(iconAfterCopy).toHaveClass("text-green-500");

    // Wait for the copied state to reset
    await waitFor(
      () => {
        const iconAfterReset = screen.getByRole("img", { hidden: true });
        expect(iconAfterReset).toHaveClass("text-gray-500");
      },
      { timeout: 2500 }
    );
  });

  it("handles clipboard API failure gracefully", async () => {
    // Mock clipboard API to throw an error
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(
      new Error("Clipboard write failed")
    );

    // Spy on console.error
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<CopyToClipboard textToCopy={textToCopy} />);

    const button = screen.getByRole("button", { name: /copy to clipboard/i });

    // Simulate a button click
    fireEvent.click(button);

    // Verify that an error is logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to copy: ",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
