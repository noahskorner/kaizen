import { useState, FormEvent } from 'react';
import './landing.page.css';

export const LandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onNameChange = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const onEmailChange = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onMessageChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const contact = {
      name,
      email,
      message
    };
    console.log({ contact });
  };

  return (
    <div>
      <div className="flex min-h-screen w-full flex-col items-center bg-circle-gradient from-blue-600 to-slate-900">
        <nav className="flex h-36 w-full items-center justify-between bg-gradient-to-b from-slate-950 via-blue-950 to-transparent p-8">
          <div className="w-1/3"></div>
          <div className="hidden lg:flex">
            <a className="cursor-pointer rounded-full px-4 py-2 text-sm font-light text-white hover:underline">
              Testimonials
            </a>
            <a className="cursor-pointer rounded-full px-4 py-2 text-sm font-light text-white hover:underline">
              Capabilities
            </a>
            <a className="cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-light text-white hover:underline">
              About Us
            </a>
            <a className="cursor-pointer rounded-full px-4 py-2 text-sm font-light text-white hover:underline">
              Careers
            </a>
          </div>
          <div className="w-1/3"></div>
        </nav>
        <div className="flex w-full flex-grow flex-col items-center gap-y-16 px-4 pb-32 2xl:flex-row 2xl:px-16">
          <div className="flex w-full flex-col items-center justify-center 2xl:items-end">
            <div className="flex w-full flex-col gap-y-8">
              <h1 className="font-secondary text-3xl font-semibold leading-snug text-white 2xl:text-5xl 2xl:leading-snug">
                Turbocharge your business with our help.
              </h1>
              <p className="text-lg text-gray-300">
                We prioritize&nbsp;
                <span className="underline">Human-Driven Design</span>,&nbsp;
                <span className="underline">Test-Driven Development</span>,
                and&nbsp;
                <span className="underline">
                  Impactful AI and Machine Learning
                </span>
                &nbsp;solutions. We specialize in&nbsp;
                <span className="underline">Vertical Slice Architecture</span>,
                ensuring efficient and scalable systems. With a focus on &nbsp;
                <span className="underline">
                  Continuous Integration/Continuous Deployment
                </span>
                &nbsp;and&nbsp;
                <span className="underline">Infrastructure as Code</span>, we
                deliver cutting-edge solutions tailored to your business needs.
              </p>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="w-full max-w-xl rounded bg-slate-50 p-8 shadow-lg">
              <form onSubmit={onSubmit} className="flex w-full flex-col">
                <h2 className="mb-8 font-secondary text-3xl font-semibold leading-snug text-gray-900">
                  How can we help?
                </h2>
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900">
                    Your name
                  </label>
                  <input
                    value={name}
                    onInput={onNameChange}
                    type="text"
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Jon Snow"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 ">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    required
                    placeholder="jon.snow@gmail.com"
                    value={email}
                    onInput={onEmailChange}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-900">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                    placeholder="How can we help?"
                    required
                    value={message}
                    onInput={onMessageChange}></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="content">
        {content.map(({ title, subtitle }, index) => {
          return (
            <div key={index} className="content__item">
              <div className="h-full w-full bg-circle-gradient from-blue-950 via-slate-900 to-slate-900 lg:w-1/2"></div>
              <div
                className={`${index % 2 === 0 ? 'items-start' : 'items-end'} flex h-full w-full flex-col justify-center gap-y-8 bg-zinc-200 p-4 lg:w-1/2 lg:p-8`}>
                <div className="flex w-full flex-col gap-y-4 2xl:w-2/3">
                  <h3 className="font-secondary text-xl font-semibold leading-tight md:text-3xl md:leading-tight lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight">
                    {title}
                  </h3>
                  <p className="text-lg text-gray-700">{subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
      {/* <footer className="h-[20vh] w-full bg-gradient-to-r from-slate-900 to-blue-600"></footer> */}
    </div>
  );
};
