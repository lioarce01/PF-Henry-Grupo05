import React, { useState } from "react"
import ChatBot from "react-simple-chatbot"
import { ThemeProvider } from "styled-components"
import { AiFillWechat } from "react-icons/ai"

const theme = {
	background: "#f5f8fb",
	fontFamily: "Roboto Mono",
	headerBgColor: "#ff5f5f",
	headerFontColor: "#fff",
	headerFontSize: "16px",
	botBubbleColor: "#ff5f5f",
	botFontColor: "#fff",
	userBubbleColor: "#fff",
	userFontColor: "#4a4a4a",
}

const HomeChatBot = () => {
	const [toggle, setToggle] = useState(false)

	const handleToggle = () => {
		setToggle(!toggle)
	}

	return (
		<div className="flex flex-col justify-end">
			<div className="flex flex-col transition duration-300">
				{toggle ? (
					<ThemeProvider theme={theme}>
						<ChatBot
							className=""
							steps={[
								{
									id: "1",
									message: "Welcome!, we are Paws Founding!. What's your name?",
									trigger: "2",
								},
								{
									id: "2",
									user: true,
									trigger: "3",
								},
								{
									id: "3",
									message:
										"Hi {previousValue}, nice to meet you!. Please select an option",
									trigger: "4",
								},
								{
									id: "4",
									options: [
										{ value: 1, label: "About us", trigger: "5" },
										{ value: 2, label: "How can I help?", trigger: "6" },
									],
								},
								{
									id: "5",
									message:
										"At Paws Founding we know that NGOs and community shelters, usually have a really hard time raising money and lack tools to campaign for it.That's why our page is completely pro-bono, of course you can help us and them by donating to our campain: all of the extra profits will go to the least founded shelters in the page.",
									trigger: "7",
								},
								{
									id: "6",
									message:
										"You can help by finding an organization you are interested in, and supply as much as you can, or you can also help by donating to the organization in order to support animal care.",
									trigger: "7",
								},
								{
									id: "7",
									options: [
										{ value: 1, label: "Thanks!", trigger: "8" },
										{ value: 2, label: "How can I donate?", trigger: "9" },
									],
								},
								{
									id: "8",
									message: "You're welcome! Have a nice day!",
									trigger: "10",
								},
								{
									id: "9",
									message:
										"You can donate by entering any shelter listed on the page and clicking the 'Button' button. Remember that the donation is voluntary and helps a lot to care for animals!.",
									trigger: "7",
								},
								{
									id: "10",
									message: "Do you want to start over?",
									trigger: "11",
								},
								{
									id: "11",
									options: [
										{ value: 1, label: "Yes", trigger: "4" },
										{ value: 2, label: "No", trigger: "12" },
									],
								},
								{
									id: "12",
									message: "Thanks for visiting us!",
									end: true,
								},
							]}
						/>
					</ThemeProvider>
				) : null}
			</div>
			<div className="flex justify-end w-full">
				<button
					onClick={handleToggle}
					className="bg-[#ff6363] rounded-full p-2 mt-2 border-2 hover:bg-[#ff7f7f] transition duration-300 outline-none focus:outline-none"
				>
					<AiFillWechat className="text-4xl text-white" />
				</button>
			</div>
		</div>
	)
}

export default HomeChatBot
