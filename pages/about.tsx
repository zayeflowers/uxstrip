export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-comic text-primary text-center mb-8">
        About UX Strip
      </h1>
      
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            UX Strip is dedicated to bringing humor to the world of user experience design. 
            We believe that laughter is an essential part of the creative process, and our 
            comics aim to capture the funny, frustrating, and all-too-relatable moments in 
            the life of UX professionals.
          </p>
          <p className="text-gray-700">
            Our goal is to build a comprehensive archive of UX-related comics that designers, 
            developers, and product managers can enjoy and share with their teams.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">The Team</h2>
          <p className="text-gray-700 mb-4">
            UX Strip was created by a small team of designers and developers who share a 
            passion for both UX design and comics. We started this project as a way to 
            document the humorous side of our daily work lives.
          </p>
          <p className="text-gray-700">
            We're always looking for contributors and submissions from the UX community. 
            If you have a comic to share, please visit our Submit page!
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you!
          </p>
          <p className="text-gray-700">
            Email us at: <a href="mailto:contact@uxstrip.com" className="text-primary hover:underline">contact@uxstrip.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
