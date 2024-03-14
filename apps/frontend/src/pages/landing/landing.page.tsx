import './landing.page.css';
import content from './content.json';

export const LandingPage = () => {
  return (
    <div>
      <div className="flex h-[90vh] w-full flex-col items-center bg-circle-gradient from-blue-600 to-slate-900">
        <nav className="flex h-36 w-full items-center justify-between bg-gradient-to-b from-slate-950 via-blue-950 to-transparent px-4 pb-8">
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
        <div className="flex h-full w-full flex-col-reverse p-4 md:flex-row">
          <div className="flex h-full w-full flex-col items-end justify-center">
            <div className="flex w-full max-w-4xl flex-col gap-y-8">
              <h1 className="font-secondary text-3xl font-medium leading-snug text-white md:text-4xl xl:text-5xl">
                Empowering Innovation through Human-Centered Design, Test-Driven
                Development, and Efficient Feature Delivery.
              </h1>
              <p className="font-light text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolorum necessitatibus, vel dolorem quo distinctio, dicta
                recusandae hic molestiae, magni nobis aliquid quisquam voluptas
                laborum expedita esse sunt! Sapiente, voluptas adipisci?
              </p>
            </div>
          </div>
          <div className="flex h-full w-full items-center justify-center"></div>
        </div>
      </div>
      <div className="h-[7vh] w-full bg-white"></div>
      <div className="h-[90vh] w-full">
        {content.map(({ title, subtitle }, index) => {
          return (
            <div key={index} className="content">
              <div className="h-full w-1/2 bg-circle-gradient from-blue-950 via-slate-900 to-slate-900"></div>
              <div className="content__info flex">
                <div className="flex w-1/2 flex-col gap-y-4">
                  <h3 className="font-secondary text-6xl font-semibold">
                    {title}
                  </h3>
                  <p className="text-lg leading-loose">{subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <footer className="h-[20vh] w-full bg-gradient-to-r from-slate-900 to-blue-600"></footer> */}
    </div>
  );
};
