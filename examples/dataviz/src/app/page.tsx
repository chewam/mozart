import Question from "@/ui/question"
import Visualisation from "@/ui/visulisation"
import { QuestionProvider } from "@/app/use-question"

export default function Home() {
  return (
    <main className="container mx-auto">
      <h1>Chinook schema explorer</h1>
      <QuestionProvider>
        <Question />
        <Visualisation />
      </QuestionProvider>
    </main>
  )
}
