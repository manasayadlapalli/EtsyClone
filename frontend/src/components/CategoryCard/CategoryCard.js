import './CategoryCard.css'
import { Link} from 'react-router-dom';


let cardDetailsList = [{"id" : 1, "image" : "https://i.etsystatic.com/12397853/r/il/505fa0/2426681051/il_300x300.2426681051_mocv.jpg", "title": "Wall decor" },
                        {"id" : 2, "image": "https://i.etsystatic.com/29669210/r/il/48a8a1/3619807266/il_300x300.3619807266_4hg4.jpg", "title": "Outdoor & Garden"},
                        {"id" : 3, "image": "https://i.etsystatic.com/8928370/r/il/f32f25/3376320499/il_300x300.3376320499_7sqq.jpg", "title": "Kitchen & Dining"},
                        {"id" : 4, "image": "https://i.etsystatic.com/5395361/r/il/5bb896/3641190222/il_300x300.3641190222_fydq.jpg", "title" : "Necklaces"},
                        {"id" : 5, "image": "https://i.etsystatic.com/10115319/r/il/b2ab7a/3171926331/il_300x300.3171926331_p6i7.jpg", "title": "Wedding Decor"},
                        {"id" : 6, "image": "https://i.etsystatic.com/10448437/r/il/8d7c57/1985247369/il_300x300.1985247369_d33t.jpg", "title": "On Sale"}
                        ]

const CategoryCard = () => {

        return (
            <div className='container'>
                <h1>Welcome to Etsy "username"!</h1>
                <div className="categCard">
                    {(cardDetailsList.map(cardDetails =>{
                        return (                            
                             <div key={"cardDetails-"+cardDetails.id} className="catge_effect">
                                  <Link to={"/category/"+cardDetails.id}>
                                    <div className='categ_div'>
                                        <img className= 'categ_image' src={cardDetails.image} alt=""/>
                                        <span className='categ_name'>{cardDetails.title}</span>
                                    </div>
                                </Link>
                                </div>
                               )
                    }))}
                </div>
            </div>  
        );
}



export default CategoryCard;
