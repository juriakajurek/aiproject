import { Finger, FingerCurl, FingerDirection, GestureDescription } from "fingerpose"


const thumbsDownDescription = new GestureDescription('thumbs_down');

thumbsDownDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
thumbsDownDescription.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
thumbsDownDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);
thumbsDownDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  thumbsDownDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  thumbsDownDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// thumbsDownDescription.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 1.0);
// thumbsDownDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
// thumbsDownDescription.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
// thumbsDownDescription.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 1.0);

export default thumbsDownDescription;
