import Link from 'next/link'

import { Container, Content } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import { Text } from '@components/Text'

const TermsPage = () => {
  return (
    <Layout className='overflow-y-hidden relative bg-black max-w-screen'>
      <Container className='overflow-visible pb-[38px] border-b border-[rgba(102,102,102,0.40)]'>
        <Content>
          <div className='flex flex-col items-center justify-center pt-[150px] md:pt-[220px] pb-[100px]'>
            <Text
              as='h1'
              className='text-4xl md:text-5xl font-bold mb-8 text-white'
            >
              Terms & Conditions
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
                  Welcome to Matrix Layer Protocol. These Terms & Conditions
                  govern your use of our website and services. By accessing or
                  using our website, you agree to be bound by these terms.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  2. Description of Services
                </Text>
                <Text>
                  MLPhone, integrating cutting-edge AI and Depin technology to
                  usher in a new era of the Web3 ecosystem. With advanced iris
                  recognition technology, MLPhone provides you with a unique
                  digital identity while ensuring the safety of your privacy.
                  Relying on the Matrix Layer Protocol, a new decentralized
                  ecosystem is constructed, with the MLP underlying protocol
                  offering robust security for network communications. The
                  diverse intelligent hardware and application scenarios of
                  MLPhone make it easy to access decentralized networks.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  3. Use of Services
                </Text>
                <Text>
                  You agree to use our services in compliance with all
                  applicable laws and regulations. Unauthorized use of our
                  services, including but not limited to reverse engineering or
                  unauthorized distribution, is strictly prohibited.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  4. User Accounts
                </Text>
                <Text>
                  To access certain features of our services, you may need to
                  create a user account. You are responsible for maintaining the
                  confidentiality of your account information and for all
                  activities that occur under your account.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  5. Intellectual Property
                </Text>
                <Text>
                  All content, trademarks, service marks, logos, and software on
                  this website are the property of Matrix Layer Protocol or its
                  licensors and are protected by intellectual property laws.
                  Unauthorized use of this content is prohibited.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  6. Privacy Policy
                </Text>
                <Text>
                  Your privacy is important to us. Please refer to our Privacy
                  Policy for information on how we collect, use, and protect
                  your personal information.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  7. Disclaimers
                </Text>
                <Text>
                  Our services are provided “as is” without warranties of any
                  kind. We do not guarantee the accuracy, completeness, or
                  reliability of any information on our website or through our
                  products.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  8. Limitation of Liability
                </Text>
                <Text>
                  Matrix Layer Protocol shall not be liable for any damages
                  arising from the use or inability to use our services,
                  including but not limited to direct, indirect, incidental, and
                  consequential damages.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  9. Changes to Terms
                </Text>
                <Text>
                  We reserve the right to modify these Terms & Conditions at any
                  time. Any changes will be effective immediately upon posting
                  on our website. Your continued use of the website constitutes
                  acceptance of the modified terms.
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  10. Governing Law
                </Text>
                <Text>
                  These Terms & Conditions are governed by the laws of [Your
                  Jurisdiction]. Any disputes arising from these terms shall be
                  resolved in the courts of [Your Jurisdiction].
                </Text>
              </section>

              <section className='mb-8'>
                <Text
                  as='h2'
                  className='text-2xl font-semibold mb-4 text-white'
                >
                  11. Contact Us
                </Text>
                <Text>
                  If you have any questions about these Terms & Conditions,
                  please contact us at{' '}
                  <Link
                    href='mailto:info@matrixlayer.ai'
                    className='text-blue-500 hover:underline'
                    target='_blank'
                  >
                    info@matrixlayer.ai
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

export default TermsPage
