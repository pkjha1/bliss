"use client"
import { UserAuthForm } from "@/components/user-auth-form"

export default function LoginPage() {
  // const { toast } = useToast()
  // const router = useRouter()
  // const searchParams = useSearchParams()
  // const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  // const [isLoading, setIsLoading] = useState(false)
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //   rememberMe: false,
  // })

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setFormData((prev) => ({ ...prev, [name]: value }))
  // }

  // const handleCheckboxChange = (checked: boolean) => {
  //   setFormData((prev) => ({ ...prev, rememberMe: checked }))
  // }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)

  //   try {
  //     const result = await signIn("credentials", {
  //       redirect: false,
  //       email: formData.email,
  //       password: formData.password,
  //     })

  //     if (result?.error) {
  //       toast({
  //         title: "Login failed",
  //         description: "Invalid email or password. Please try again.",
  //         variant: "destructive",
  //       })
  //     } else {
  //       toast({
  //         title: "Login successful!",
  //         description: "Welcome back to Blissful Life.",
  //       })
  //       router.push(callbackUrl)
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Something went wrong",
  //       description: "Please try again later.",
  //       variant: "destructive",
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const handleSocialLogin = async (provider: string) => {
  //   setIsLoading(true)
  //   try {
  //     await signIn(provider, { callbackUrl })
  //   } catch (error) {
  //     toast({
  //       title: "Something went wrong",
  //       description: "Please try again later.",
  //       variant: "destructive",
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  )
}

