import { Notify } from "quasar";

export default function notify(message, type = "negative") {
	Notify.create({
		message,
		type,
		position: "top-right",
	});
}
