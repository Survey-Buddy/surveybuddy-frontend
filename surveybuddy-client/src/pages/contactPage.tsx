import { useRef } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Currently inactive

    alert(
      "Apologize, but messaging is currently unavailable. Please contact us directly at thomas.h.martin89@gmail.com"
    );

    // Reset the form
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <section className="flex flex-col items-center mt-[10%] justify-center py-12 px-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Contact</CardTitle>
          <CardDescription>
            Please fill out the form below and we'll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>

        <form ref={formRef} onSubmit={sendEmail} className="space-y-4 px-6">
          <CardContent>
            <Input
              type="text"
              name="from_name"
              placeholder="Your Name"
              required
              className="mb-4"
            />
            <Input
              type="email"
              name="from_email"
              placeholder="Your Email"
              required
              className="mb-4"
            />
            <Textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              className="mb-4"
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" className="w-full md:w-auto">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default ContactPage;
