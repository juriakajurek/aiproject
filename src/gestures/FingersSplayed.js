
import { Finger, FingerCurl, FingerDirection, GestureDescription } from "fingerpose"

const fingersSplayedDescription = new GestureDescription('fingers_splayed');

// thumb:
fingersSplayedDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
fingersSplayedDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
fingersSplayedDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
fingersSplayedDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
fingersSplayedDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
fingersSplayedDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

// index:
fingersSplayedDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
fingersSplayedDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
fingersSplayedDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
fingersSplayedDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
fingersSplayedDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
fingersSplayedDescription.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
fingersSplayedDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
fingersSplayedDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
fingersSplayedDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
fingersSplayedDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
fingersSplayedDescription.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
fingersSplayedDescription.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
fingersSplayedDescription.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
fingersSplayedDescription.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);
fingersSplayedDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);
fingersSplayedDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);
fingersSplayedDescription.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0);
fingersSplayedDescription.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 1.0);

// pinky:
fingersSplayedDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
fingersSplayedDescription.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
fingersSplayedDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
fingersSplayedDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);
fingersSplayedDescription.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0);
fingersSplayedDescription.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0);

export default fingersSplayedDescription;