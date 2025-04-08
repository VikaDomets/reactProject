// src/pages/Exhibitions.jsx
// const Exhibitions = () => {
//     return (
//       <div>
//         <h1>Виставки</h1>
//         <p>Тут буде інформація про наші виставки.</p>
//       </div>
//     );
//   };
  
//   export default Exhibitions;
  
// ExhibitionPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostComments from "../components/PostComments";

const ExhibitionPage = () => {
  const { id } = useParams();
  const [exhibition, setExhibition] = useState(null);

  useEffect(() => {
    const fetchExhibition = async () => {
      const res = await axios.get(`/api/exhibitions/one/${id}/`);
      setExhibition(res.data);
    };

    fetchExhibition();
  }, [id]);

  if (!exhibition) return <div className="text-center p-8">Завантаження...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{exhibition.title}</h1>
      <img
        src={exhibition.image}
        alt={exhibition.title}
        className="w-full h-auto rounded shadow mb-4"
      />
      <p className="text-gray-700 mb-6">{exhibition.description}</p>

      {/* 🔽 Коментарі + лайки */}
      <PostComments postId={id} />
    </div>
  );
};

export default ExhibitionPage;
