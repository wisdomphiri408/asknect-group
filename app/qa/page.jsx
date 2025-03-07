import QuestionCard from '@/components/QuestionCard';
import Link from "next/link";
import { UsersRound,ShieldQuestion,Pencil } from 'lucide-react';

export default function Home() {
    const questions = [
      {
        id: 1,
        username: 'John Doe',
        profileImg: '/assets/profile/channels4_profile (2).jpg', 
        questionTitle: 'What’s the easiest way to remember the periodic table?',
        questionDescription: ' I struggle with memorizing the periodic table. Are there any shortcuts, mnemonics, or tricks to make it easier?',
        answers: 25,
        views: 102,
        picture: '/assets/Thumbnails/human digestive.jpg',
        likes:98,
      },
      {
        id: 2,
        username: 'Prince Maths',
        profileImg: '/assets/profile/profile1.jpg', 
        questionTitle: 'How can I quickly solve quadratic equations?',
        questionDescription: 'Solving quadratic equations takes me too long. Are there any shortcut methods that can help me solve them faster?',
        answers: 120,
        views: 560,
        likes:180,
      },
      {
        id: 3,
        username: 'Goeffry James',
        profileImg: '/assets/profile/unnamed.jpg', 
        questionTitle: 'What is the best way to learn JavaScript?',
        questionDescription: 'I\'m looking for advice on how to get started with JavaScript...',
        answers: 100,
        views: 256,
        likes:16,
      },
      {
        id: 4,
        username: 'John Manda',
        profileImg: '/assets/profile/unnamed (1).jpg', 
        questionTitle: 'Is there a trick to understanding map scales in geography??',
        questionDescription: ' I find it hard to interpret map scales. Is there a shortcut or simple way to quickly calculate distances using them?',
        answers: 897,
        views: 2+"K",
        picture:"/assets/Thumbnails/Js for beginners.jpg",
        likes:1.5+'K',
      },
      {
        id: 5,
        username: 'Mike Namate',
        profileImg: '/assets/profile/channels4_profile.jpg', 
        questionTitle: 'What’s the fastest way to balance chemical equations?',
        questionDescription: 'I get stuck when trying to balance chemical equations. Are there any quick strategies or shortcuts to do it efficiently?',
        answers: 78,
        views: 102,
        likes:38,
      },
      {
        id: 6,
        username: 'Goddy Lackson',
        profileImg: '/assets/profile/channels4_profile (1).jpg', 
        questionTitle: 'How can I remember the parts of a plant cell easily?',
        questionDescription: 'There are so many parts in a plant cell! Are there any memory tricks or shortcuts to help me recall them during exams?',
        answers: 89,
        views: 230,
        likes:79,
      },
      {
        id: 7,
        username: 'Asknect Physics',
        profileImg: '/assets/icons/favicon.png', 
        questionTitle: 'What is the best way to learn JavaScript?',
        questionDescription: 'I\'m looking for advice on how to get started with JavaScript...',
        answers: 18,
        views: 102,
        picture:"/assets/Thumbnails/newton's law.jpg"
      },
      {
        id: 8,
        username: 'Mr Engineer',
        profileImg: '/assets/profile/channels4_profile (2).jpg', 
        questionTitle: 'How can I improve my CSS skills?',
        questionDescription: 'I want to become proficient in CSS. What are some good resources?',
        answers: 96,
        views: 500,
        likes:300,
      },
    ];
  
    return (
      <div className="container mx-0 sm:mx-auto mt-16  px-0 sm:px-4 pb-8">
        <header className='flex justify-between items-center pt-2 p-4 shadow mb-4 dark:bg-gray-800'>
          <div className='flex'>
          <ShieldQuestion  className='dark:text-white cursor-pointer'/>
          <span className='dark:text-white cursor-pointer'> 
            Ask
          </span>
          </div>

          <div className='flex '>
          <Pencil  className='dark:text-white cursor-pointer'/>
          <span className='dark:text-white cursor-pointer'> 
            Post
          </span>
          </div>

          <div >
          <Link href='/groups' className='flex '>
          <UsersRound  className='dark:text-white cursor-pointer'/>
          <span className='dark:text-white cursor-pointer'> 
            Groups
          </span>
          </Link>
          </div>
        </header>
  
        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </section>
      </div>
    );
  }
  