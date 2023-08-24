// // /server/api/feed.js
// import axios from 'axios';

// export default async (req, res) => {
//     const baseURL = "http://localhost:8888/api/feed/";
//     try {
//         const response = await axios.get(baseURL);
//         console.log("All posts retrieved:", response.data);
//         res.json(response.data);
//     } catch (error) {
//         console.error("Error fetching all posts:", error);
//         res.status(500).json({ error: "Error fetching posts" });
//     }
// }???
