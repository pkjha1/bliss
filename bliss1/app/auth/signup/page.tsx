"use client"
import { UserRegisterForm } from "@/components/user-register-form"

export default function SignupPage() {
  //const { toast } = useToast()
  //const router = useRouter()

  //const [isLoading, setIsLoading] = useState(false)
  //const [formData, setFormData] = useState({
  //  name: "",
  //  email: "",
  //  password: "",
  //  confirmPassword: "",
  //  agreeTerms: false,
  //})
  //const [errors, setErrors] = useState({
  //  password: "",
  //  confirmPassword: "",
  //})

  //const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  const { name, value } = e.target
  //  setFormData((prev) => ({ ...prev, [name]: value }))

  //  // Clear errors when typing
  //  if (name === "password" || name === "confirmPassword") {
  //    setErrors((prev) => ({ ...prev, [name]: "" }))
  //  }
  //}

  //const handleCheckboxChange = (checked: boolean) => {
  //  setFormData((prev) => ({ ...prev, agreeTerms: checked }))
  //}

  //const validateForm = () => {
  //  let valid = true
  //  const newErrors = { password: "", confirmPassword: "" }

  //  if (formData.password.length < 8) {
  //    newErrors.password = "Password must be at least 8 characters"
  //    valid = false
  //  }

  //  if (formData.password !== formData.confirmPassword) {
  //    newErrors.confirmPassword = "Passwords do not match"
  //    valid = false
  //  }

  //  setErrors(newErrors)
  //  return valid
  //}

  //const handleSubmit = async (e: React.FormEvent) => {
  //  e.preventDefault()

  //  if (!validateForm()) return

  //  setIsLoading(true)

  //  try {
  //    const response = await fetch("/api/auth/register", {
  //      method: "POST",
  //      headers: {
  //        "Content-Type": "application/json",
  //      },
  //      body: JSON.stringify({
  //        name: formData.name,
  //        email: formData.email,
  //        password: formData.password,
  //      }),
  //    })

  //    const data = await response.json()

  //    if (!response.ok) {
  //      throw new Error(data.message || "Something went wrong")
  //    }

  //    toast({
  //      title: "Account created!",
  //      description: "Welcome to Blissful Life. Your spiritual journey begins now.",
  //    })

  //    // Sign in the user
  //    await signIn("credentials", {
  //      redirect: false,
  //      email: formData.email,
  //      password: formData.password,
  //    })

  //    router.push("/dashboard")
  //  } catch (error) {
  //    toast({
  //      title: "Registration failed",
  //      description: error instanceof Error ? error.message : "Please try again later.",
  //      variant: "destructive",
  //    })
  //  } finally {
  //    setIsLoading(false)
  //  }
  //}

  //const handleSocialLogin = async (provider: string) => {
  //  setIsLoading(true)
  //  try {
  //    await signIn(provider, { callbackUrl: "/dashboard" })
  //  } catch (error) {
  //    toast({
  //      title: "Something went wrong",
  //      description: "Please try again later.",
  //      variant: "destructive",
  //    })
  //  } finally {
  //    setIsLoading(false)
  //  }
  //}

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your details below to create your account</p>
        </div>
        <UserRegisterForm />
      </div>
    </div>
  )
}

