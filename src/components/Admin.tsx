import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowLeft,
  Inbox,
  LayoutDashboard,
  LogOut,
  Moon,
  Package,
  Plus,
  Search,
  Settings,
  Sun,
  Trash2,
} from "lucide-react";
import type { Product, SiteSettings } from "../data/siteData";
import { supabase } from "../lib/supabase";
import { useLanguage } from "../i18n/useLanguage";

type Page = "overview" | "products" | "messages" | "store" | "settings";
type Message = {
  id: string;
  name: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
};
type ProductForm = {
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  is_active: boolean;
};
const emptyProduct: ProductForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  image_url: "",
  is_active: true,
};

function getPage(): Page {
  const page = window.location.pathname.split("/").pop();
  return page === "products" || page === "messages" || page === "store" || page === "settings"
    ? page
    : "overview";
}

function Admin() {
  const [session, setSession] = useState<boolean | null>(null);
  const [page, setPage] = useState<Page>(getPage);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [store, setStore] = useState<SiteSettings>({
    brand_name: 'Dantil', description: '', phone: '', whatsapp: '', instagram: '', address: '', opening_hours: '',
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState<ProductForm>(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("dantil-theme") === "dark",
  );
  const { language, setLanguage } = useLanguage();
  const arabic = language === "ar";

  useEffect(() => {
    void supabase.auth
      .getSession()
      .then(({ data }) => setSession(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, currentSession) =>
      setSession(Boolean(currentSession)),
    );
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem("dantil-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    if (session) void loadData();
  }, [session]);

  async function loadData() {
    const [productResult, messageResult, storeResult] = await Promise.all([
      supabase
        .from("products")
        .select(
          "id, name, description, price, currency, image_url, category, is_active",
        )
        .order("sort_order"),
      supabase
        .from("contact_messages")
        .select("id, name, phone, message, status, created_at")
        .order("created_at", { ascending: false }),
      supabase.from('site_settings').select('brand_name, description, phone, whatsapp, instagram, address, opening_hours').eq('id', 'default').single(),
    ]);
    if (productResult.data) setProducts(productResult.data as Product[]);
    if (messageResult.data) setMessages(messageResult.data as Message[]);
    if (storeResult.data) setStore(storeResult.data as SiteSettings);
  }

  function navigate(nextPage: Page) {
    setPage(nextPage);
    window.history.pushState(
      {},
      "",
      nextPage === "overview" ? "/admin" : `/admin/${nextPage}`,
    );
  }

  useEffect(() => {
    const onPopState = () => setPage(getPage());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (adminId !== "12345678") {
      setError(arabic ? "رقم الأدمن غير صحيح." : "Admin number is incorrect.");
      return;
    }
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_ADMIN_EMAIL,
      password,
    });
    if (loginError)
      setError(
        arabic ? "بيانات الدخول غير صحيحة." : "Incorrect login details.",
      );
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { ...form, price: form.price ? Number(form.price) : null };
    if (editingId)
      await supabase.from("products").update(payload).eq("id", editingId);
    else await supabase.from("products").insert(payload);
    setForm(emptyProduct);
    setEditingId(null);
    setNotice(arabic ? "تم حفظ المنتج." : "Product saved.");
    await loadData();
  }

  async function uploadImage(file: File) {
    const path = `${crypto.randomUUID()}.${file.name.split(".").pop() ?? "jpg"}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, file);
    if (uploadError) {
      setNotice(arabic ? "تعذر رفع الصورة." : "Image upload failed.");
      return;
    }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setForm((current) => ({ ...current, image_url: data.publicUrl }));
  }

  async function updateMessage(id: string, status: string) {
    await supabase.from("contact_messages").update({ status }).eq("id", id);
    await loadData();
  }
  async function removeProduct(id: string) {
    await supabase.from("products").delete().eq("id", id);
    await loadData();
  }
  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { error: passwordError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setNotice(
      passwordError
        ? arabic
          ? "تعذر تغيير كلمة المرور."
          : "Password update failed."
        : arabic
          ? "تم تغيير كلمة المرور."
          : "Password updated.",
    );
    if (!passwordError) setNewPassword("");
  }

  async function saveStore(nextStore: SiteSettings) {
    const { error: storeError } = await supabase
      .from('site_settings')
      .update(nextStore)
      .eq('id', 'default');
    setNotice(storeError ? (arabic ? 'تعذر حفظ معلومات المتجر.' : 'Store information could not be saved.') : (arabic ? 'تم حفظ معلومات المتجر.' : 'Store information saved.'));
    if (!storeError) setStore(nextStore);
  }

  if (session === null)
    return (
      <div className="grid min-h-screen place-items-center bg-[#f9f1ee]">
        Loading...
      </div>
    );
  if (!session)
    return (
      <Login
        arabic={arabic}
        adminId={adminId}
        password={password}
        error={error}
        setAdminId={setAdminId}
        setPassword={setPassword}
        onSubmit={login}
      />
    );

  const labels = {
    overview: arabic ? "نظرة عامة" : "Overview",
    products: arabic ? "المنتجات" : "Products",
    messages: arabic ? "الرسائل" : "Messages",
    store: arabic ? "معلومات المتجر" : "Store info",
    settings: arabic ? "الإعدادات" : "Settings",
  };
  const visibleMessages = messages.filter((message) => {
    const term = search.trim().toLowerCase();
    return (
      (filter === "all" || message.status === filter) &&
      (!term ||
        message.name.toLowerCase().includes(term) ||
        message.message.toLowerCase().includes(term) ||
        message.phone?.toLowerCase().includes(term))
    );
  });
  const activeProducts = products.filter(
    (product) => product.is_active !== false,
  ).length;
  const newMessages = messages.filter(
    (message) => message.status === "new",
  ).length;

  return (
    <main className="min-h-screen bg-[#f9f1ee] text-[#2d1d1d]">
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-64 border-e border-[#d7b5aa] bg-[#fffaf8] p-5 lg:block rtl:start-auto rtl:end-0 rtl:border-e-0 rtl:border-s">
        <div className="flex items-center gap-3 border-b border-[#ead7d0] pb-6">
          <img src="/dantil-logo.svg" alt="Dantil logo" className="h-10 w-10 rounded-full" />
          <div>
            <div className="brand-serif text-3xl">Dantil</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#80645e]">
              Admin studio
            </div>
          </div>
        </div>
        <nav className="mt-8 grid gap-2">
          {(["overview", "products", "messages", "store", "settings"] as Page[]).map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => navigate(item)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-start text-sm font-medium transition ${page === item ? "bg-[#382425] text-white" : "text-[#5d4d4b] hover:bg-[#f1e2dc]"}`}
              >
                <NavIcon page={item} />
                {labels[item]}
              </button>
            ),
          )}
        </nav>
      </aside>
      <div className="min-h-screen lg:ms-64 rtl:lg:ms-0 rtl:lg:me-64">
        <header className="flex min-h-24 items-center justify-between border-b border-[#d7b5aa] bg-[#fffaf8]/80 px-4 py-5 backdrop-blur sm:px-8">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-[#80645e]">
              Dantil / Admin
            </div>
            <h1 className="brand-serif text-4xl sm:text-5xl">{labels[page]}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(arabic ? "en" : "ar")}
              className="rounded-full border border-[#c9a79d] px-3 py-2 text-sm font-semibold"
            >
              {arabic ? "English" : "العربية"}
            </button>
            <button
              type="button"
              onClick={() => setIsDark((value) => !value)}
              className="rounded-full border border-[#c9a79d] p-2.5"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href="/"
              className="rounded-full border border-[#c9a79d] p-2.5"
              aria-label="Back to website"
            >
              <ArrowLeft size={17} />
            </a>
            <button
              type="button"
              onClick={() => void supabase.auth.signOut()}
              className="inline-flex items-center gap-2 rounded-full bg-[#382425] px-3 py-2.5 text-sm text-white"
            >
              <LogOut size={16} />
              {arabic ? "خروج" : "Logout"}
            </button>
          </div>
        </header>
        <div className="border-b border-[#d7b5aa] bg-[#fffaf8] p-3 lg:hidden">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {(["overview", "products", "messages", "store", "settings"] as Page[]).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => navigate(item)}
                  className={`rounded-xl px-2 py-3 text-xs ${page === item ? "bg-[#382425] text-white" : "text-[#5d4d4b]"}`}
                >
                  {labels[item]}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="mx-auto max-w-7xl p-4 sm:p-8">
          {notice && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              {notice}
            </div>
          )}
          {page === "overview" && (
            <Overview
              arabic={arabic}
              products={products}
              activeProducts={activeProducts}
              newMessages={newMessages}
              messages={messages}
            />
          )}
          {page === "products" && (
            <ProductsPage
              arabic={arabic}
              products={products}
              form={form}
              editingId={editingId}
              setForm={setForm}
              setEditingId={setEditingId}
              onSubmit={saveProduct}
              onUpload={uploadImage}
              onDelete={removeProduct}
            />
          )}
          {page === "messages" && (
            <MessagesPage
              arabic={arabic}
              messages={visibleMessages}
              total={messages.length}
              search={search}
              filter={filter}
              setSearch={setSearch}
              setFilter={setFilter}
              onUpdate={updateMessage}
            />
          )}
          {page === "store" && (
            <StoreInfo arabic={arabic} store={store} />
          )}
          {page === "settings" && (
            <SettingsPage
              key={`${store.phone}-${store.address}-${store.opening_hours}`}
              arabic={arabic}
              store={store}
              onSaveStore={saveStore}
              password={newPassword}
              setPassword={setNewPassword}
              onSubmit={changePassword}
            />
          )}
        </div>
      </div>
    </main>
  );
}

function NavIcon({ page }: { page: Page }) {
  const Icon =
    page === "overview"
      ? LayoutDashboard
      : page === "products"
        ? Package
        : page === "messages"
          ? Inbox
          : Settings;
  return <Icon size={17} />;
}

function Overview({
  arabic,
  products,
  activeProducts,
  newMessages,
  messages,
}: {
  arabic: boolean;
  products: Product[];
  activeProducts: number;
  newMessages: number;
  messages: Message[];
}) {
  const categories = products.reduce<Record<string, number>>(
    (result, product) => {
      const key = product.category ?? (arabic ? "بدون تصنيف" : "Uncategorized");
      result[key] = (result[key] ?? 0) + 1;
      return result;
    },
    {},
  );
  return (
    <div>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          [arabic ? "كل المنتجات" : "Total products", products.length],
          [arabic ? "المنتجات الظاهرة" : "Visible products", activeProducts],
          [arabic ? "الرسائل الجديدة" : "New messages", newMessages],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-[#d7b5aa] bg-[#fffaf8] p-5"
          >
            <div className="text-sm text-[#80645e]">{label}</div>
            <div dir="ltr" className="brand-serif mt-2 text-5xl">{value}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#d7b5aa] bg-[#fffaf8] p-6">
          <h2 className="brand-serif text-3xl">
            {arabic ? "المنتجات حسب التصنيف" : "Products by category"}
          </h2>
          <div className="mt-6 space-y-4">
            {Object.entries(categories).map(([category, count]) => (
              <div key={category}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{category}</span>
                  <span>{count}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#f0e2dc]">
                  <div
                    className="h-full rounded-full bg-[#7f5a52]"
                    style={{
                      width: `${Math.max(12, (count / Math.max(products.length, 1)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[#d7b5aa] bg-[#fffaf8] p-6">
          <h2 className="brand-serif text-3xl">
            {arabic ? "ملخص الرسائل" : "Message summary"}
          </h2>
          <div className="mt-6 space-y-4">
            {["new", "read", "replied", "archived"].map((status) => (
              <div
                key={status}
                className="flex items-center justify-between border-b border-[#ead7d0] pb-3 text-sm"
              >
                <span className="capitalize">{status}</span>
                <strong>
                  {
                    messages.filter((message) => message.status === status)
                      .length
                  }
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsPage({
  arabic,
  products,
  form,
  editingId,
  setForm,
  setEditingId,
  onSubmit,
  onUpload,
  onDelete,
}: {
  arabic: boolean;
  products: Product[];
  form: ProductForm;
  editingId: string | null;
  setForm: (form: ProductForm) => void;
  setEditingId: (id: string | null) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpload: (file: File) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#d7b5aa] bg-[#fffaf8] p-5 sm:p-8">
      <h2 className="brand-serif text-4xl">
        {arabic ? "إدارة المنتجات" : "Product management"}
      </h2>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
        <input
          required
          placeholder={arabic ? "اسم المنتج" : "Product name"}
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="rounded-xl border border-[#d7b5aa] bg-white px-4 py-3"
        />
        <input
          placeholder={arabic ? "التصنيف" : "Category"}
          value={form.category}
          onChange={(event) =>
            setForm({ ...form, category: event.target.value })
          }
          className="rounded-xl border border-[#d7b5aa] bg-white px-4 py-3"
        />
        <input
          type="number"
          min="0"
          placeholder={arabic ? "السعر" : "Price"}
          value={form.price}
          onChange={(event) => setForm({ ...form, price: event.target.value })}
          className="rounded-xl border border-[#d7b5aa] bg-white px-4 py-3"
        />
        <input
          placeholder={arabic ? "رابط الصورة" : "Image URL"}
          value={form.image_url}
          onChange={(event) =>
            setForm({ ...form, image_url: event.target.value })
          }
          className="rounded-xl border border-[#d7b5aa] bg-white px-4 py-3"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file);
          }}
          className="rounded-xl border border-[#d7b5aa] bg-white px-4 py-3 sm:col-span-2"
        />
        <textarea
          required
          placeholder={arabic ? "وصف المنتج" : "Description"}
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
          rows={3}
          className="rounded-xl border border-[#d7b5aa] bg-white px-4 py-3 sm:col-span-2"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(event) =>
              setForm({ ...form, is_active: event.target.checked })
            }
          />
          {arabic ? "ظاهر على الموقع" : "Visible on website"}
        </label>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#382425] px-5 py-3 text-sm text-white sm:col-span-2">
          <Plus size={16} />
          {editingId
            ? arabic
              ? "تحديث المنتج"
              : "Update product"
            : arabic
              ? "إضافة المنتج"
              : "Add product"}
        </button>
      </form>
      <div className="mt-8 divide-y divide-[#ead7d0]">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between gap-4 py-4"
          >
            <div>
              <strong>{product.name}</strong>
              <div className="text-sm text-[#80645e]">
                {product.category ?? "Uncategorized"} ·{" "}
                {product.is_active === false ? "Hidden" : "Visible"}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingId(product.id);
                  setForm({
                    name: product.name,
                    description: product.description ?? "",
                    price: product.price?.toString() ?? "",
                    category: product.category ?? "",
                    image_url: product.image_url ?? "",
                    is_active: product.is_active !== false,
                  });
                }}
                className="text-sm text-[#7f5a52]"
              >
                {arabic ? "تعديل" : "Edit"}
              </button>
              <button
                type="button"
                onClick={() => onDelete(product.id)}
                className="text-red-700"
                aria-label="Delete product"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesPage({
  arabic,
  messages,
  total,
  search,
  filter,
  setSearch,
  setFilter,
  onUpdate,
}: {
  arabic: boolean;
  messages: Message[];
  total: number;
  search: string;
  filter: string;
  setSearch: (value: string) => void;
  setFilter: (value: string) => void;
  onUpdate: (id: string, status: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#d7b5aa] bg-[#fffaf8] p-5 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="brand-serif text-4xl">
            {arabic ? "رسائل العملاء" : "Customer messages"}
          </h2>
          <p className="mt-1 text-sm text-[#80645e]">
            {messages.length} / {total}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-[#d7b5aa] bg-white px-3">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={arabic ? "بحث" : "Search"}
              className="w-32 py-3 outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-xl border border-[#d7b5aa] bg-white px-3"
          >
            <option value="all">{arabic ? "الكل" : "All"}</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {messages.map((message) => (
          <article
            key={message.id}
            className="rounded-xl border border-[#ead7d0] p-4"
          >
            <div className="flex justify-between gap-3">
              <strong>{message.name}</strong>
              <select
                value={message.status}
                onChange={(event) => onUpdate(message.id, event.target.value)}
                className="rounded-lg border border-[#d7b5aa] bg-white px-2 py-1 text-xs"
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#5d4d4b]">
              {message.message}
            </p>
            {message.phone && (
              <a
                href={`tel:${message.phone}`}
                className="mt-2 block text-sm text-[#7f5a52]"
              >
                <span dir="ltr">{message.phone}</span>
              </a>
            )}
          </article>
        ))}
        {messages.length === 0 && (
          <p className="text-sm text-[#80645e]">
            {arabic ? "لا توجد نتائج." : "No messages found."}
          </p>
        )}
      </div>
    </div>
  );
}

function SettingsPage({
  arabic,
  store,
  onSaveStore,
  password,
  setPassword,
  onSubmit,
}: {
  arabic: boolean;
  store: SiteSettings;
  onSaveStore: (store: SiteSettings) => Promise<void>;
  password: string;
  setPassword: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const [form, setForm] = useState(store);

  return (
    <div className="grid max-w-5xl gap-6 lg:grid-cols-2">
      <form onSubmit={(event) => { event.preventDefault(); void onSaveStore(form); }} className="rounded-2xl border border-[#d7b5aa] bg-[#fffaf8] p-5 sm:p-8">
        <h2 className="brand-serif text-4xl">{arabic ? 'معلومات المتجر' : 'Store information'}</h2>
        <div className="mt-6 grid gap-3">
          <input dir="ltr" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder={arabic ? 'رقم الهاتف' : 'Phone'} className="rounded-xl border border-[#d7b5aa] bg-white px-4 py-3" />
          <input dir="ltr" value={form.whatsapp} onChange={(event) => setForm({ ...form, whatsapp: event.target.value })} placeholder="WhatsApp" className="rounded-xl border border-[#d7b5aa] bg-white px-4 py-3" />
          <input dir="ltr" value={form.instagram} onChange={(event) => setForm({ ...form, instagram: event.target.value })} placeholder="Instagram" className="rounded-xl border border-[#d7b5aa] bg-white px-4 py-3" />
          <input value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} placeholder={arabic ? 'العنوان' : 'Address'} className="rounded-xl border border-[#d7b5aa] bg-white px-4 py-3" />
          <input value={form.opening_hours} onChange={(event) => setForm({ ...form, opening_hours: event.target.value })} placeholder={arabic ? 'ساعات الفتح والإغلاق' : 'Opening hours'} className="rounded-xl border border-[#d7b5aa] bg-white px-4 py-3" />
        </div>
        <button className="mt-5 rounded-full bg-[#382425] px-5 py-3 text-sm text-white">{arabic ? 'حفظ معلومات المتجر' : 'Save store information'}</button>
      </form>
      <div className="rounded-2xl border border-[#d7b5aa] bg-[#fffaf8] p-5 sm:p-8">
      <h2 className="brand-serif text-4xl">
        {arabic ? "إعدادات الأمان" : "Security settings"}
      </h2>
      <p className="mt-2 text-sm text-[#5d4d4b]">
        {arabic
          ? "غيّر كلمة مرور الأدمن من هنا."
          : "Change the admin password from here."}
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <input
          required
          minLength={8}
          type="password"
          placeholder={arabic ? "كلمة المرور الجديدة" : "New password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="flex-1 rounded-xl border border-[#d7b5aa] bg-white px-4 py-3"
        />
        <button className="rounded-full bg-[#382425] px-5 py-3 text-sm text-white">
          {arabic ? "حفظ" : "Save"}
        </button>
      </form>
      </div>
    </div>
  );
}

function StoreInfo({ arabic, store }: { arabic: boolean; store: SiteSettings }) {
  const rows = [
    [arabic ? 'رقم الهاتف' : 'Phone', store.phone],
    ['WhatsApp', store.whatsapp],
    ['Instagram', store.instagram],
    [arabic ? 'العنوان' : 'Address', store.address],
    [arabic ? 'ساعات الفتح والإغلاق' : 'Opening hours', store.opening_hours],
  ];
  return (
    <div className="admin-store-panel max-w-5xl rounded-3xl border border-[#d7b5aa] p-7 shadow-[0_24px_70px_rgba(80,58,60,0.08)] sm:p-12">
      <div className="border-b border-[#ead7d0] pb-8">
        <div className="text-xs uppercase tracking-[0.2em] text-[#80645e]">{arabic ? 'نبذة المتجر' : 'Store profile'}</div>
        <h2 className="brand-serif mt-3 text-6xl">{arabic ? 'معلومات المتجر' : 'Store information'}</h2>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {rows.map(([label, value]) => <div key={label} className="admin-store-card rounded-2xl border p-5"><div className="text-xs uppercase tracking-[0.16em] text-[#80645e]">{label}</div><div dir={label === 'Instagram' || label === 'WhatsApp' || label === 'Phone' || label === 'رقم الهاتف' ? 'ltr' : undefined} className="mt-3 break-words text-lg font-medium">{value || (arabic ? 'غير مضاف' : 'Not set')}</div></div>)}
      </div>
      <div className="admin-store-note mt-8 rounded-2xl p-5 text-sm">{arabic ? 'للتعديل، افتح زر الإعدادات من الشريط الجانبي.' : 'To edit these details, open Settings from the sidebar.'}</div>
    </div>
  );
}

function Login({
  arabic,
  adminId,
  password,
  error,
  setAdminId,
  setPassword,
  onSubmit,
}: {
  arabic: boolean;
  adminId: string;
  password: string;
  error: string;
  setAdminId: (value: string) => void;
  setPassword: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f9f1ee] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl border border-[#d7b5aa] bg-[#fffaf8] p-8 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.18em] text-[#80645e]">
          Dantil private access
        </div>
        <h1 className="brand-serif mt-3 text-6xl">
          {arabic ? "مرحبًا بك" : "Welcome back."}
        </h1>
        <label className="mt-8 block text-sm">
          {arabic ? "رقم الأدمن" : "Admin number"}
          <input
            required
            inputMode="numeric"
            maxLength={8}
            value={adminId}
            onChange={(event) =>
              setAdminId(event.target.value.replace(/\D/g, ""))
            }
            className="mt-2 w-full rounded-xl border border-[#d7b5aa] bg-white px-4 py-3 tracking-[0.3em]"
          />
        </label>
        <label className="mt-4 block text-sm">
          {arabic ? "كلمة المرور" : "Password"}
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#d7b5aa] bg-white px-4 py-3"
          />
        </label>
        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
        <button className="mt-6 w-full rounded-full bg-[#382425] px-5 py-3.5 text-sm text-white">
          {arabic ? "دخول" : "Enter dashboard"}
        </button>
      </form>
    </main>
  );
}

export default Admin;
