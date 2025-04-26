import { useState } from 'react';

export default function SubmitPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // This is a mock submission - in a real app, you would send this to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log({
        name,
        email,
        title,
        description,
        file: file?.name
      });
      
      // Reset form
      setName('');
      setEmail('');
      setTitle('');
      setDescription('');
      setFile(null);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('There was an error submitting your comic. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-comic text-primary text-center mb-8">
        Submit Your Comic
      </h1>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        {submitSuccess ? (
          <div className="text-center py-8">
            <svg 
              className="w-16 h-16 text-green-500 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-700 mb-6">
              Your comic has been submitted successfully. Our team will review it shortly.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="btn btn-primary"
            >
              Submit Another Comic
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Comic Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
                Upload Comic (JPG, PNG, GIF)
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                accept=".jpg,.jpeg,.png,.gif"
                required
              />
            </div>
            
            {submitError && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                {submitError}
              </div>
            )}
            
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Comic'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
