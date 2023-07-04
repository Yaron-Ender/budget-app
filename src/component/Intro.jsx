import { Form, useFetcher} from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";  
import { useEffect,useState } from "react";
import illustration from '../assets/illustration.png'
const Intro = () => {
const [submmiting,setSubmmiting] =useState(false)
const fetcher=useFetcher()
useEffect(()=>{
if (fetcher.state === "submitting") {
setSubmmiting((prev) => !prev);
}
},[setSubmmiting,fetcher])
return (
<div className="intro">
<div>
<h1>
Take Control of <span className="accent">Your Money</span>
</h1>
<p>
Personal budgeting is the secret to financial freedom. Start your
journey today.
</p>
<fetcher.Form method="post">
<input
type="text"
name="userName"
required
placeholder="What is your name?"
aria-label="Your Name"
autoComplete="given-name"
/>
<input type="hidden" name='_action' value='newUser' />
<button type="submit" className="btn btn--dark" disabled={submmiting}>
<span>Create Account</span>
<UserPlusIcon width={20} />
</button>
</fetcher.Form>
</div>
<img src={illustration} alt="Person with money" width={600} />
</div>
);
};

export default Intro;