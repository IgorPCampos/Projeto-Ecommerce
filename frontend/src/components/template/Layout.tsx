import Header from "./Header"
import Content from "./Content"
import MenuLateral from "./MenuLateral"
import Message from "./Message"

interface LayoutProps {
    title: string
    subtitle: string
    children?: any
}

export default function Layout(props: LayoutProps) {

    return (
     
            <div className={`flex flex-row h-screen`}>
                <MenuLateral />
                <div className="flex-grow overflow-y-auto flex flex-col w-full p-7 bg-gray-300 ">
                    <Header title={props.title} subTitle={props.subtitle} />
                    <Message/>
                    <Content >
                        {props.children}
                    </Content>
                </div>
            </div>

    )
}