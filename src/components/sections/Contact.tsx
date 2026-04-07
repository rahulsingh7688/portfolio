import { Mail, Github, Linkedin, Download } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/Button';

const contactLinks = [
  {
    icon: Mail,
    label: 'rahul@example.com',
    href: 'mailto:rahul@example.com',
    external: false,
  },
  {
    icon: Github,
    label: 'github.com/rahulsingh',
    href: 'https://github.com/rahulsingh7688',
    external: true,
  },
  {
    icon: Linkedin,
    label: 'linkedin.com/in/rahul_s',
    href: 'https://www.linkedin.com/in/rahul-s-245a1766?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    external: true,
  },
];

export function Contact() {
  return (
    <div className="py-24 bg-slate-50 dark:bg-slate-800/50">
      <SectionWrapper id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left column: contact info */}
            <div>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
                Get In Touch
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Let&apos;s Work Together
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Whether you&apos;re looking to hire a data engineer, need an AI model built, or want
                to modernize your data infrastructure — I&apos;d love to hear from you.
              </p>

              {/* Contact info items */}
              <ul className="flex flex-col gap-4 mb-8">
                {contactLinks.map(({ icon: Icon, label, href, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      {...(external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <Icon size={20} className="text-indigo-500 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Download Resume */}
              <Button as="a" href="/resume.pdf" download variant="secondary">
                <Download size={18} className="mr-2" aria-hidden="true" />
                Download Resume
              </Button>
            </div>

            {/* Right column: form */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <ContactForm />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
