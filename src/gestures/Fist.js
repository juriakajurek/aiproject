
import { Finger, FingerCurl, FingerDirection, GestureDescription } from "fingerpose"

const fistDescription = new GestureDescription('fist');

for(let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  fistDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
fistDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, .7);    

export default fistDescription;