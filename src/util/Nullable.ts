/*
* Saw this somewhere and though it would be nicer than the optional? for optiona parameters,
* since the backend returns null for null fields anyway.
* */

type Nullable<T> = T | null;

export default Nullable;