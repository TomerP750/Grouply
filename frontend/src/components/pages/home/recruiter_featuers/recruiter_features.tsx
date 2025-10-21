import { BiTask } from "react-icons/bi";
import { MdWorkOutline } from "react-icons/md";
import "./recruiter_features.css";

export function RecruiterFeatures() {
    return (
        <div className="recruiter-features">
            
            <h1 className="title">
                <MdWorkOutline/>
                <span>Recruiter?</span>

                </h1>
            <p className="semi-title">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim repellat soluta corrupti possimus, quis laboriosam ducimus consectetur sapiente nesciunt, reiciendis neque perspiciatis iure a impedit asperiores perferendis rem aspernatur suscipit?</p>


            <div className="features-grid">
                <div className="feature">
                    <BiTask size={40} className="icon"/>
                    <div className="feature-right">
                        <p className="feature-title">Title</p>
                        <p className="feature-description">description description description</p>
                    </div>
                </div>

                <div className="feature">
                    <BiTask size={40} className="icon"/>
                    <div className="feature-right">
                        <p className="feature-title">Title</p>
                        <p className="feature-description">description description description</p>
                    </div>
                </div>

                <div className="feature">
                    <BiTask size={40} className="icon"/>
                    <div className="feature-right">
                        <p className="feature-title">Title</p>
                        <p className="feature-description">description description description</p>
                    </div>
                </div>
               
                
            </div>
        </div>
    )
}