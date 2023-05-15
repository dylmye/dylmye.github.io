import Link from 'next/link'
import Card from './card'

const Header = () => {
  return (
    <Card extraClasses="mt-8 mb-12">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
      <Link href="/">
        Dylan Myers
      </Link>
      .
    </h2>
    </Card>
  )
}

export default Header
