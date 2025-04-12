import { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ExhibitionsContext } from '../context/ExhibitionsContext';
import LikeButton from '../components/LikeButton';
import CommentSection from '../components/CommentSection';
import styles from '../styles/exhibitionSingle.module.css';
import axios from 'axios';

import img1 from '../assets/img/exh1.jpg';
import img2 from '../assets/img/exh2.jpg';
import img3 from '../assets/img/exh3.jpg';
import img4 from '../assets/img/exh4.jpg';
import img5 from '../assets/img/exh5.jpg';
import img6 from '../assets/img/exh6.jpg';
import img7 from '../assets/img/exh7.jpg';

// Статичні дані (як у Exhibitions.jsx)
const staticExhibitions = [
  {
    id: 'local-1',
    title: 'Виставка "Знак кольору"',
    date: '22.03.23-22.04.23',
    image: img1,
    description: 'Антон Ковач – один з представників Закарпатської школи живопису, що на даний час ділиться з поціновувачами новим баченням сучасної проблематики живопису. Виставка презентує серію абстрактних полотен створених в період 2021-2022 рр. Автор використовує колір і форму як ключові засоби виразності живопису, а також експериментує з орнаментальними мотивами. Частина робіт невипадково пов’язана з передчуттям війни, яку художник створив у другій половині 2022 р.'
  },
  {
    id: 'local-2',
    title: 'Виставка «Геометрія кольору»',
    date: '20.07.23-18.08.23',
    image: img2,
    description: ['Виставковий проєкт демонструє творчі доробки художника в галузі художнього дерева. У серії робіт «Анатомія кольору» митець досліджує тривимірний простір, градації кольору та динаміку об’єктів.',
    'Автор виставки про концепцію: «Геометрія кольору для мене – це визначення відстані, яку можна прокласти між двома кольорами. Фокус кольорових блоків з різних порід дерева, різної форми і конструкції відображає фізичні властивості сприйняття кольору.',
    'Представлена геометрична кольорова модель для кожного є своїм мікропростором з емоціями, переживаннями і навіть страхами. Важливо занурити людину в певне середовище кольору і геометричної абстракції, щоб спонукати її фізично відчути рух кольору та власні '
    ]
  },
  {
    id: 'local-3',
    title: 'Виставка "Осмислення"',
    date: '04.06.23-16.06.23',
    image: img3,
    description: 'Художниця представить свою першу персональну виставку у Львові, в якій експериментує з абстрактними зображеннями, надписами та грою слів у своїх роботах, привертає увагу своїм неординарним підходом. Поступово, поєднання надписів та абстрактних форм розкриває зміст робіт, звертаючись до важливих тем, думок та емоцій. Твори художниці проникають глибоко в сутність та розповідають правдиву історію про незламність та боротьбу українського народу.'
  },
  {
    id: 'local-4',
    title: 'Виставка «Ті-1980-ті»',
    date: '22.12.22-31.01.23',
    image: img4,
    description: 'Виставка «Ті-1980-ті» показує ключові роботи Володимира Лободи з переломного десятиліття, коли його стиль набув сміливої експресії та політичного підтексту. У залі представлено понад 30 робіт – яскраві абстрактні полотна, графічні серії та ескізи монументальних проєктів, створених під впливом української архаїки. Центральний елемент експозиції – цикл «Степові візії», де поєднуються народні символи з авангардною пластикою. Особливий інтерес викликають рідко експоновані роботи з приватних колекцій, що демонструють художній бунт проти радянської цензури. Куратори підкреслили драматичний контраст між яскравими фарбами Лободи та сірим тоталітарним фоном епохи.'
  },
   {
    id: 'local-5',
    title: 'Виставка «Гіпоглікемія»',
    date: '17.11.22-18.12.22',
    image: img5,
    description: ['Переживання людиною критичних емоційних і фізичних станів чи не найчастіше осмислюються у мистецтві. Особистий досвід «кризи» провокує художника віднайти в ньому оновлення й перетворити надмір «зниження» життєвих сил на нову життєдайну енергію. Осмислений, проговорений, промальований до деталей внутрішній конфлікт між життям і смертю, спричинений критичним станом, вибудовує систему власних опорних точок виживання.',
    '«Гіпоглікемія» – цикл робіт Ростислава Лужецького, безпосередньо створеного на особистому досвіді цього фізичного стану. Водночас, завдяки художньому переосмисленню, цей досвід легко виходить за межі конкретного особистого переживання і пропонує через споглядання своєрідну рецептуру подолання критичного стану людиною: її фізичного чи емоційного виснаження, її проживання катастрофи, війни, родинної драми, – втрати і втраченості.'
   ]
  },
  {
    id: 'local-6',
    title: 'Виставка «УДВОХ»',
    date: '10.05.24 – 10.07.24',
    image: img6,
    description: ['В рамках експозиції творчість Людмили Любоди буде представлена періодом 1973-1978 років, коли художниця проживала у Дніпропетровську (нині Дніпро) в часи глухого совєтського «застою». Разом з чоловіком Володимиром Лободою (1943-2023) вони буквально «прогризали» своєю творчістю стіни нерозуміння, чинячи опір радянській системі з її антимистецькими канонами і тотальним винищенням всілякого інакодумства. У цей період творчість Людмили набуває ніжних вальорів, сюжетні картини перемежовуються з краєвидами, з’являються експресивні мотиви, які в подальші роки стануть невід’ємною складовою концепції творчості художниці. Це – оригінальний і самобутній період, який досі майже не був представлений на виставках.',
    'Для експозиції Соломії Лободи відібрано найпізніший період її творчості 2020-2023 років. Це роботи, створені в родинній садибі Лободів у селі Туровому на Дніпровщині. В основному – це краєвиди берегів річки Орелі, мотиви степу з горою Лелією, сільські краєвиди, в яких Соломія «синтезує» уроки, що дали їй батьки і власний досвід мисткині. Також на виставці буде представлено ряд робіт створених на мистецьких резиденціях у Берліні та Цайці (Німеччина), на які її люб’язно запросив німецький Ґете-інститут та спілка «ART and RISK» у 2022-2023 роках. Центральною експозицією цього періоду є цикл «Іконостас», що складається з 10 полотен, об’єднаних темою Страстей Христових з елементами перегуків з традиційним українським іконостасом.'
    ]
  },
  {
    id: 'local-7',
    title: 'Виставка «Сни перелітних»',
    date: '17.08.2018 – 06. 09.2018',
    image: img7,
    description: ['Молоді художники роздумують над темою швидкоплинності життя. Представлені роботи не тільки асоціюють цей процес з природніми мотивами, а й звертають увагу до міркувань та уявлень наших предків. Вирій як місце особливої гармонії служить вагомою складовою їх світоглядної системи. У ньому споріднено існують як людські душі, так і перелітні птахи. Разом вони потрапляють у вирій та повертаються з нього: птах, аби звити гніздо, а душа, щоби заново народитись.',
    'Образ птаха, який наскрізно проходить через творчість Христини Приймак набуває тут особливих алегорично-символічних характеристик. В гармонійному поєднанні з людськими образами та рослинними елементами, символ міфічного птаха стає одним з основних у серії живописних робіт.',
    'Скульптурні роботи Богдана Смаля втілені в природних матеріалах – дереві та металі, доповнюють спробу моделювання небаченого світу, а техніка, яку використовує автор, підкреслює їх своєрідні властивості.'
  ]
  },
];

const ExhibitionSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSingleExhibition, updateExhibition, deleteExhibition } = useContext(ExhibitionsContext);
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    const loadExhibition = async () => {
      try {
        if (id.startsWith('local-')) {
          const staticExh = staticExhibitions.find(ex => ex.id === id);
          setExhibition(staticExh);
          setEditData({
            title: staticExh.title,
            date: staticExh.date,
            description: Array.isArray(staticExh.description) ? 
              staticExh.description.join('\n\n') : staticExh.description
          });
        } else {
          const data = await fetchSingleExhibition(id);
          setExhibition(data);
          setEditData({
            title: data.title,
            date: data.date || `${data.start_date} - ${data.end_date}`,
            description: data.description
          });
        }
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setLoading(false);
      }
    };
    loadExhibition();
  }, [id]);

  useEffect(() => {
    if (exhibition) {
      const imageUrl = exhibition.image instanceof File ? 
        URL.createObjectURL(exhibition.image) : 
        exhibition.image;
      
      document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
    }
    
    return () => {
      document.body.style.removeProperty('--bg-image');
    };
  }, [exhibition]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (id.startsWith('local-')) {
        // Для локальних даних просто оновлюємо стан
        const updatedExhibition = {
          ...exhibition,
          title: editData.title,
          date: editData.date,
          description: editData.description
        };
        setExhibition(updatedExhibition);
      } else {
        // Для даних з API відправляємо запит на оновлення
        await updateExhibition(id, editData);
        const updatedData = await fetchSingleExhibition(id);
        setExhibition(updatedData);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Помилка збереження:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!id.startsWith('local-')) {
        await deleteExhibition(id);
      }
      navigate('/exhibitions');
    } catch (error) {
      console.error("Помилка видалення:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className={styles.loading}>Завантаження...</div>;
  if (!exhibition) return <div className={styles.error}>Виставку не знайдено</div>;

  return (
    <section className={styles.exhibitionSingle}>
      <div className={styles.header}>
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
            className={styles.editInput}
          />
        ) : (
          <h1>{exhibition.title}</h1>
        )}
        
        {!isEditing ? (
          <button 
            onClick={handleEdit}
            className={styles.editButton}
          >
            Редагувати
          </button>
        ) : (
          <div className={styles.editButtons}>
            <button 
              onClick={handleSave}
              className={styles.saveButton}
            >
              Зберегти
            </button>
            <button 
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              Видалити
            </button>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <img 
          src={exhibition.image instanceof File ? URL.createObjectURL(exhibition.image) : exhibition.image} 
          alt={exhibition.title} 
          className={styles.image}
        />
        
        {isEditing ? (
          <>
            <input
              type="text"
              name="date"
              value={editData.date}
              onChange={handleInputChange}
              className={styles.editInput}
            />
            <textarea
              name="description"
              value={editData.description}
              onChange={handleInputChange}
              className={styles.editTextarea}
            />
          </>
        ) : (
          <>
            <p className={styles.dates}>
              {exhibition.date || `${exhibition.start_date} - ${exhibition.end_date}`}
            </p>
            <div className={styles.description}>
              {Array.isArray(exhibition.description) ? (
                exhibition.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>{exhibition.description}</p>
              )}
            </div>
          </>
        )}
        
        <div className={styles.interactions}>
          <LikeButton exhibitionId={id} />
        </div>
      </div>

      <CommentSection 
        exhibitionId={id} 
        isEditing={isEditing} 
      />
    </section>
  );
};

export default ExhibitionSingle;