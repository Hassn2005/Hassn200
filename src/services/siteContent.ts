import { supabase } from '../lib/supabase'
import type { ContactMethod, FeatureItem, Product, SiteSettings } from '../data/siteData'

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, currency, image_url, category, name_ar, description_ar, category_ar')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return (data ?? []) as Product[]
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('brand_name, description, phone, whatsapp, instagram, address, opening_hours')
    .eq('id', 'default')
    .single()

  if (error) {
    throw error
  }

  return data as SiteSettings
}

export async function fetchFeatures(): Promise<FeatureItem[]> {
  const { data, error } = await supabase
    .from('features')
    .select('title, description, icon, title_ar, description_ar')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    throw error
  }

  return (data ?? []) as FeatureItem[]
}

export async function fetchContactMethods(): Promise<ContactMethod[]> {
  const { data, error } = await supabase
    .from('contact_methods')
    .select('title, value, href, icon')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    throw error
  }

  return (data ?? []) as ContactMethod[]
}