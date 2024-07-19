// import { FormEvent } from 'react';
import styles from './index.module.css';

export default function HomePage() {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');
  const name = '';
  const email = '';
  const message = '';

  // const onNameChange = (event: FormEvent<HTMLInputElement>) => {
  //   // setName(event.currentTarget.value);
  // };

  // const onEmailChange = (event: FormEvent<HTMLInputElement>) => {
  //   // setEmail(event.currentTarget.value);
  // };

  // const onMessageChange = (event: FormEvent<HTMLTextAreaElement>) => {
  //   // setMessage(event.currentTarget.value);
  // };

  // const onSubmit = (event: FormEvent) => {
  //   event.preventDefault();

  //   // const contact = {
  //   //   name,
  //   //   email,
  //   //   message
  //   // };
  //   // console.log({ contact });
  // };

  return (
    <div
      className={`${styles.bg} flex h-full w-full flex-1 flex-col items-center bg-slate-950`}>
      <div className="flex w-full flex-grow flex-col items-center gap-y-16 px-4 pb-32 2xl:flex-row 2xl:px-16">
        <div className="flex w-full flex-col items-center justify-center 2xl:items-end">
          <div className="flex w-full flex-col gap-y-8">
            <h1 className="font-secondary text-3xl font-semibold leading-snug text-white 2xl:text-5xl 2xl:leading-snug">
              We&apos;re not consultants. We&apos;re architects.
            </h1>
            <p className="textmd text-gray-300">
              We prioritize&nbsp;
              <span className="cursor-pointer hover:underline">
                Human-Driven Design
              </span>
              ,&nbsp;
              <span className="cursor-pointer hover:underline">
                Test-Driven Development
              </span>
              , and&nbsp;
              <span className="cursor-pointer hover:underline">
                Impactful AI and Machine Learning
              </span>
              &nbsp;solutions. We specialize in&nbsp;
              <span className="cursor-pointer hover:underline">
                Vertical Slice Architecture
              </span>
              , ensuring efficient and scalable systems. With a focus on&nbsp;
              <span className="cursor-pointer hover:underline">
                Continuous Integration/Continuous Deployment
              </span>
              &nbsp;and&nbsp;
              <span className="cursor-pointer hover:underline">
                Infrastructure as Code
              </span>
              , we deliver cutting-edge solutions tailored to your business
              needs.
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-xl rounded bg-slate-50 p-8 shadow-lg">
            <form className="flex w-full flex-col">
              <h2 className="font-secondary mb-8 text-3xl font-semibold leading-snug text-gray-900">
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
                  type="text"
                  id="name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  placeholder="jon.snow@gmail.com"
                  value={email}
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 "
                  placeholder="How can we help?"
                  required
                  value={message}></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 sm:w-auto">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
