import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://www.credly.com/users/subhasish-behera.4bc5874f/badges.json', {
      next: { revalidate: 3600 } // Cache results for 1 hour to ensure fast load times
    })

    if (!res.ok) {
      throw new Error(`Credly returned status ${res.status}`)
    }

    const json = await res.json()

    if (!json.data || !Array.isArray(json.data)) {
      throw new Error('Invalid response structure from Credly')
    }

    const certifications = json.data.map(item => {
      const title = item.badge_template?.name || "Certification"
      const issuer = item.issuer?.summary?.replace('issued by ', '') || item.badge_template?.issuer?.entities?.[0]?.entity?.name || "Unknown Issuer"
      
      // Determine category based on title keyword matching
      let category = "Development"
      const lowerTitle = title.toLowerCase()
      if (lowerTitle.includes("ccna") || lowerTitle.includes("network") || lowerTitle.includes("routing") || lowerTitle.includes("switching")) {
        category = "Networking"
      } else if (lowerTitle.includes("cyber") || lowerTitle.includes("security") || lowerTitle.includes("endpoint security")) {
        category = "Security"
      } else if (lowerTitle.includes("ai") || lowerTitle.includes("artificial intelligence") || lowerTitle.includes("modern ai")) {
        category = "AI / ML"
      } else if (lowerTitle.includes("data science") || lowerTitle.includes("data fundamentals")) {
        category = "Data Science"
      } else if (lowerTitle.includes("project management") || lowerTitle.includes("management")) {
        category = "Management"
      }

      // Format dates
      let formattedDate = ""
      if (item.issued_at_date) {
        const d = new Date(item.issued_at_date)
        formattedDate = d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
      }

      let formattedExpiry = null
      if (item.expires_at_date) {
        const d = new Date(item.expires_at_date)
        formattedExpiry = d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
      }

      return {
        title,
        issuer,
        date: formattedDate || item.issued_at_date,
        expiry: formattedExpiry,
        link: `https://www.credly.com/badges/${item.id}`,
        category,
        imageUrl: item.badge_template?.image_url
      }
    })

    return NextResponse.json({ data: certifications }, { status: 200 })
  } catch (error) {
    console.error('Error fetching Credly badges:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to retrieve certifications' },
      { status: 500 }
    )
  }
}
