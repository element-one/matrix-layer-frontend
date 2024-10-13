import Link from 'next/link'

import { Container, Content } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'

const PrivacyPage = () => {
  return (
    <Layout className='overflow-y-hidden relative bg-black max-w-screen'>
      <Container className='overflow-visible pb-[38px] border-b border-[rgba(102,102,102,0.40)]'>
        <Content>
          <div className='flex flex-col items-center justify-center pt-[150px] md:pt-[220px] pb-[100px]'>
            <Text
              as='h1'
              className='text-4xl md:text-5xl font-bold mb-8 text-white'
            >
              Privacy Policy
            </Text>
            <div className='max-w-3xl mx-auto text-gray-300'>
              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  1. Introduction
                </Text>
                <Text>
                  Matrix Layer Protocol is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, and disclose
                  your personal information.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  2. Information Collection
                </Text>
                <Text>
                  We may collect personal information such as your name, email
                  address, and payment information when you use our services.
                  Additionally, we collect non-personal information such as your
                  IP address, device information, and browsing behavior.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  3. Use of Information
                </Text>
                <Text>
                  We use your personal information to provide and improve our
                  services, process transactions, and communicate with you. This
                  includes facilitating the seamless integration of MLPhone into
                  your mobile experience.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  4. Information Sharing
                </Text>
                <Text>
                  We do not sell, trade, or otherwise transfer your personal
                  information to outside parties without your consent, except as
                  required by law or to protect our rights.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  5. Data Security
                </Text>
                <Text>
                  We implement robust security measures to protect your personal
                  information from unauthorized access, disclosure, alteration,
                  or destruction. However, no method of transmission over the
                  internet is completely secure.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  6. Cookies
                </Text>
                <Text>
                  Our website uses cookies to enhance your browsing experience.
                  You can choose to disable cookies through your browser
                  settings, but this may affect the functionality of our
                  website.
                </Text>
              </section>
              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  7. Third-Party Services
                </Text>
                <Text>
                  We may use third-party services to assist us in providing our
                  services. These third parties have access to your information
                  only to perform specific tasks on our behalf and are obligated
                  to protect your information.
                </Text>
              </section>
              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  8. Children’s Privacy
                </Text>
                <Text>
                  Our services are not intended for children under the age of
                  13. We do not knowingly collect personal information from
                  children under 13.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  9. Changes to Privacy Policy
                </Text>
                <Text>
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page with an updated revision
                  date. Your continued use of our services constitutes
                  acceptance of the changes.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  10. Contact Us
                </Text>
                <Text>
                  If you have any questions about this Privacy Policy, please
                  contact us at{' '}
                  <Link
                    href='https://matrixlayer.ai/contact'
                    className='text-blue-500 hover:underline'
                    target='_blank'
                  >
                    https://matrixlayer.ai/contact
                  </Link>
                </Text>
              </section>
            </div>
          </div>
        </Content>
      </Container>
    </Layout>
  )
}

export default PrivacyPage
