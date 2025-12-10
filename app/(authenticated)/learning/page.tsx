"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { BookOpen, Clock, Award } from 'lucide-react';

const LearningPage = () => {
	const [courses] = useState([
		{ id: 1, title: 'Intro to Cryptography', progress: 98, type: 'Course' },
		{ id: 2, title: 'Web Exploitation Basics', progress: 45, type: 'Course' },
		{ id: 3, title: 'OSINT Fundamentals', progress: 12, type: 'Course' },
		{ id: 4, title: 'Binary Exploitation', progress: 0, type: 'Course' }
	]);

	return (
		<div className="flex h-screen bg-black text-white font-sans">
			<Sidebar />
			<main className="flex-1 ml-64 p-4 md:p-6 lg:p-8 overflow-y-auto h-screen bg-black">
				{/* Learning content will go here */}
			</main>
		</div>
	);
};

export default LearningPage;
