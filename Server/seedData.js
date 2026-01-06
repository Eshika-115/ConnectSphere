import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from './Models/userModel.js';
import PostModel from './Models/postModel.js';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to MongoDB for full 20-post seeding...");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", salt);

        // 1. Create or retrieve users
        const usersData = [
            {
                email: "testing@gmail.com",
                password: hashedPassword,
                firstname: "Eshika",
                lastname: "Mathur",
                worksAt: "Cloud & Backend Engineer",
                about: "B.Tech CSE student passionate about Full-Stack, Cloud & DevOps 🚀",
                livesin: "Greater Noida",
                country: "India",
                relationship: "Single",
                profilePicture: "defaultProfile.png",
                coverPicture: "defaultCover.jpg"
            },
            {
                email: "priya.sharma@example.com",
                password: hashedPassword,
                firstname: "Priya",
                lastname: "Sharma",
                worksAt: "Software Engineer @ Google",
                about: "Tech enthusiast & open source contributor ✨",
                livesin: "Bengaluru",
                country: "India",
                relationship: "Single",
                profilePicture: "imgF1.png",
                coverPicture: "defaultCover.jpg"
            },
            {
                email: "aman.verma@example.com",
                password: hashedPassword,
                firstname: "Aman",
                lastname: "Verma",
                worksAt: "DevOps Engineer @ AWS",
                about: "Building scalable cloud architectures ☁️",
                livesin: "Hyderabad",
                country: "India",
                relationship: "Single",
                profilePicture: "imgF2.png",
                coverPicture: "defaultCover.jpg"
            },
            {
                email: "rohan.gupta@example.com",
                password: hashedPassword,
                firstname: "Rohan",
                lastname: "Gupta",
                worksAt: "Full Stack Developer",
                about: "Converting caffeine into code & memes ☕👾",
                livesin: "Delhi NCR",
                country: "India",
                relationship: "Single",
                profilePicture: "imgF3.jpg",
                coverPicture: "defaultCover.jpg"
            },
            {
                email: "techclub@iilm.edu",
                password: hashedPassword,
                firstname: "TechClub",
                lastname: "IILM",
                worksAt: "IILM University",
                about: "Official Tech & Innovation Club of IILM University 🎓🚀",
                livesin: "Greater Noida",
                country: "India",
                relationship: "Community",
                profilePicture: "imgF4.png",
                coverPicture: "defaultCover.jpg"
            }
        ];

        const usersMap = {};
        for (const u of usersData) {
            let user = await UserModel.findOne({ email: u.email });
            if (!user) {
                user = await UserModel.create({
                    ...u,
                    followers: [],
                    following: []
                });
            } else {
                // Keep updated details
                user.firstname = u.firstname;
                user.lastname = u.lastname;
                user.worksAt = u.worksAt;
                user.about = u.about;
                user.livesin = u.livesin;
                user.country = u.country;
                await user.save();
            }
            usersMap[u.firstname] = user;
        }

        const eshika = usersMap["Eshika"];
        const priya = usersMap["Priya"];
        const aman = usersMap["Aman"];
        const rohan = usersMap["Rohan"];
        const techclub = usersMap["TechClub"];

        // Setup following connections so timeline has posts
        eshika.following = [priya._id.toString(), aman._id.toString(), rohan._id.toString(), techclub._id.toString()];
        eshika.followers = [priya._id.toString(), aman._id.toString(), rohan._id.toString()];
        await eshika.save();

        priya.followers = [eshika._id.toString()];
        priya.following = [eshika._id.toString()];
        await priya.save();

        aman.followers = [eshika._id.toString()];
        aman.following = [eshika._id.toString()];
        await aman.save();

        rohan.followers = [eshika._id.toString()];
        rohan.following = [eshika._id.toString()];
        await rohan.save();

        techclub.followers = [eshika._id.toString()];
        await techclub.save();

        // 2. Clear old posts and insert 20 high-quality posts
        await PostModel.deleteMany({});

        const now = Date.now();
        const posts = [
            // Memes
            {
                userId: rohan._id.toString(),
                desc: "When it runs completely fine on localhost vs when deployed to production 🔥😅 #DeveloperLife #TechHumor",
                image: "meme_fine.jpg",
                likes: [eshika._id.toString(), priya._id.toString(), aman._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 5)
            },
            {
                userId: rohan._id.toString(),
                desc: "Fixing existing critical bugs ❌ | Starting a brand new project with 0 users ✅ 😂",
                image: "meme_distracted.jpg",
                likes: [eshika._id.toString(), aman._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 20)
            },
            {
                userId: rohan._id.toString(),
                desc: "Writing detailed code documentation ❌ | 'My code is self-documenting' ✅ #CodeMeme",
                image: "meme_drake.jpg",
                likes: [eshika._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 45)
            },
            {
                userId: rohan._id.toString(),
                desc: "3 AM developer dilemma: Go to bed or fix that one last bug? 🔴⚪",
                image: "meme_buttons.jpg",
                likes: [priya._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 90)
            },
            {
                userId: rohan._id.toString(),
                desc: "The code runs with 0 errors (Kalm) -> You don't know why it worked (Panik) 😱",
                image: "meme_panik.jpg",
                likes: [eshika._id.toString(), priya._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 150)
            },

            // Eshika's Posts (Project & Achievements)
            {
                userId: eshika._id.toString(),
                desc: "Proud to showcase ConnectSphere! 🌐 A full-stack social media platform built with React, Redux, Node.js, Express, and MongoDB. Includes JWT auth, image uploads, and dynamic feeds! 🚀 #MERN #FullStack",
                image: "1686729699082img1.jpg",
                likes: [priya._id.toString(), aman._id.toString(), rohan._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 10)
            },
            {
                userId: eshika._id.toString(),
                desc: "Containerized 4 microservices today using Docker Compose! Loving how seamless local vs staging environment parity feels. 🐳✨ #Docker #DevOps",
                image: "1686730403370img3.jpg",
                likes: [aman._id.toString(), priya._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 180)
            },
            {
                userId: eshika._id.toString(),
                desc: "Automated REST API integration tests using Postman collections. Reduced validation cycle time by 40%! 📊🎯",
                likes: [aman._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 300)
            },

            // Tech & Discussions
            {
                userId: priya._id.toString(),
                desc: "Hackathon weekend recap! 36 hours of non-stop building with the team. Huge congrats to all winners! 🏆💻 #Hackathon #CodingSprint",
                image: "postPic1.jpg",
                likes: [eshika._id.toString(), rohan._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 60)
            },
            {
                userId: priya._id.toString(),
                desc: "Tabs vs Spaces: Which one do you actually configure in your editor? Settle this once and for all 👇⚔️",
                likes: [eshika._id.toString(), aman._id.toString(), rohan._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 120)
            },
            {
                userId: priya._id.toString(),
                desc: "Sprint milestone celebration dinner with the engineering team! Nothing beats team synergy 🍕🎉",
                image: "postPic2.jpg",
                likes: [eshika._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 240)
            },

            // Aman's DevOps & Cloud Posts
            {
                userId: aman._id.toString(),
                desc: "Cloud infrastructure setup complete! Configured AWS ALB with custom VPC subnets and health-monitoring endpoints. ☁️🚀 #AWS #CloudArchitecture",
                image: "1686730495691img5.jpg",
                likes: [eshika._id.toString(), priya._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 80)
            },
            {
                userId: aman._id.toString(),
                desc: "Friendly reminder to all devs: Drink water, commit your work, and push your branch before shutting down! 💧💻",
                likes: [eshika._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 210)
            },
            {
                userId: aman._id.toString(),
                desc: "Kubernetes cluster auto-scaling tested under simulated high-load traffic today. Handled 10k req/sec smoothly! 📈⚡",
                likes: [eshika._id.toString(), priya._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 400)
            },

            // TechClub & Community Posts
            {
                userId: techclub._id.toString(),
                desc: "📢 ANNOUNCEMENT: IILM University Annual Hackathon 2026 is officially announced! Themes: Web 3, AI/ML, and Cloud Computing. Registrations open next Monday! 🎓🚀 #IILM #TechClub",
                image: "postPic3.jpg",
                likes: [eshika._id.toString(), priya._id.toString(), aman._id.toString(), rohan._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 30)
            },
            {
                userId: techclub._id.toString(),
                desc: "Workshop on 'Modern MERN Stack & Cloud Deployment' scheduled for this Friday at 4 PM. Hands-on coding session! Don't forget your laptops 💻",
                likes: [eshika._id.toString(), priya._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 350)
            },

            // Additional Relatable & Thought Posts
            {
                userId: rohan._id.toString(),
                desc: "Nothing matches the dopamine hit when a 200-line algorithm runs on the first attempt without a single error 🥹🔥",
                likes: [eshika._id.toString(), aman._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 480)
            },
            {
                userId: priya._id.toString(),
                desc: "What's on your coding playlist today? Lo-fi beats, synthwave, or total silence? 🎧🎵",
                likes: [eshika._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 600)
            },
            {
                userId: aman._id.toString(),
                desc: "Reading 'Designing Data-Intensive Applications'. Truly one of the best system design books ever written. Highly recommend! 📖💡",
                likes: [eshika._id.toString(), priya._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 720)
            },
            {
                userId: eshika._id.toString(),
                desc: "Late night debugging finally wrapped up! It was a tiny typo in the environment variable name all along 🤦‍♀️ Always check your .env files!",
                likes: [priya._id.toString(), rohan._id.toString(), aman._id.toString()],
                createdAt: new Date(now - 1000 * 60 * 850)
            }
        ];

        await PostModel.insertMany(posts);
        console.log(`Successfully seeded ${posts.length} posts!`);
        console.log("Database now has 20 high quality posts with memes, tech discussions and images!");
        process.exit(0);

    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seed();
